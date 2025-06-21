<script setup lang="ts">
import Card from "~/components/layout/Card.vue";
import PoolSummary from "~/components/pool/creation/summary/PoolSummary.vue";
import Form from "~/components/base/form/Form.vue";
import FormInput from "~/components/base/form/FormInput.vue";
import Label from "~/components/base/form/Label.vue";
import { usePoolCreationStore } from "~/store/pool-creation.store";
import NumberInput from "~/components/base/input/NumberInput.vue";
import Hint from "~/components/base/form/Hint.vue";
import Button from "~/components/base/input/Button.vue";
import { useAppKitAccount } from "@reown/appkit/vue";
import { useErc20Factory } from "~/composables/token/use-erc20.composable";
import { ethers } from "ethers";
import { useSolariSwap } from "~/composables/web3/contracts/use-solari-swap.composable";
import InlineInput from "~/components/base/input/InlineInput.vue";
import Tip from "~/components/layout/Tip.vue";
import PriceRangeSelector from "~/components/pool/creation/range/PriceRangeSelector.vue";
import Error from "~/components/layout/Error.vue";
import type { InlineInputOption } from "~/utils/type/base.type";
import { bigNumberWithSlippage } from "~/utils/function/currency.function";
import type { StepperItem } from "@nuxt/ui";
import { useExplorer } from "~/composables/web3/use-explorer.composable";

const runtimeConfig = useRuntimeConfig();
const store = usePoolCreationStore();
const account = useAppKitAccount();
const erc20Factory = useErc20Factory();
const token0 = erc20Factory.construct(store.state.currency0!.address);
const token1 = erc20Factory.construct(store.state.currency1!.address);
const explorer = useExplorer();
const solariSwap = useSolariSwap();
const { $modal } = useNuxtApp();
const toast = useToast();

const currency0Balance = ref(0);
const currency1Balance = ref(0);
const currentStep = ref(0);

watch(
  () => store.state.currency0Amount,
  (after) => {
    const rate = store.state.initialPrice;

    store.state.currency1Amount = after * (1 / rate);
  },
);

const buttonLabel = computed(() => {
  return !account.value.isConnected ? "Please connect your wallet" : "Continue";
});

const isDisabled = computed(() => {
  if (store.state.currency0Amount <= 0) return true;

  return !account.value.isConnected;
});

const items = ref<StepperItem[]>([
  {
    title: `Approve ${store.symbol0}`,
  },
  {
    title: `Approve ${store.symbol1}`,
  },
  {
    title: "Deposit Liquidity",
  },
]);

onMounted(async () => {
  currency0Balance.value = parseFloat(
    ethers.utils.formatEther(await token0.balanceOf()),
  );
  currency1Balance.value = parseFloat(
    ethers.utils.formatEther(await token1.balanceOf()),
  );
});

const priceRangeOptions: InlineInputOption<string>[] = [
  { label: "Full Range", value: "full" },
  { label: "Custom", value: "concentrated" },
];

const tips = [
  "• Narrower ranges earn more fees but have higher risk of going out of range",
  "• Wider ranges are safer but earn fewer fees when in range",
  "• Consider the volatility of this token pair when setting your range",
  "• Starting close to market price is recommended for new positions",
];

const nextStep = async () => {
  if (!account.value.isConnected) return $modal.open();

  const { solariSwapAddress } = runtimeConfig.public;

  const amount0 = ethers.utils.parseEther(
    store.state.currency0Amount.toString(),
  );
  const amount1 = ethers.utils.parseEther(
    store.state.currency1Amount.toString(),
  );

  currentStep.value = 0;
  store.state.loading = true;
  try {
    await token0.approve(solariSwapAddress, amount0);
    currentStep.value++;
    await token1.approve(solariSwapAddress, amount1);
    currentStep.value++;

    const slippage = 2;
    const response = await solariSwap.mintLiquidity({
      token0: store.state.currency0!.address,
      token1: store.state.currency1!.address,
      plFee: store.state.poolFee!,
      amount0,
      amount1,
      amount0Min: bigNumberWithSlippage(amount0, slippage),
      amount1Min: bigNumberWithSlippage(amount1, slippage),
      tickLower: store.tickLower,
      tickUpper: store.tickUpper,
    });

    toast.add({
      color: "success",
      title: "Initial liquidity minted successfully",
      actions: [
        {
          icon: "i-lucide-refresh-cw",
          label: "View on explorer",
          color: "neutral",
          variant: "outline",
          onClick: (e) => {
            e?.stopPropagation();

            explorer.open(explorer.getTransactionUrl(response.hash));
          },
        },
      ],
    });
  } catch (e: any) {
    toast.add({
      color: "error",
      title: "Error minting liquidity",
      description: e.reason,
    });
  } finally {
    store.state.loading = false;
  }
};
</script>

<template>
  <PoolCreationInput>
    <template #title>Finally, set your deposit amounts</template>
    <template #input>
      <PoolSummary />
      <Card>
        <Form>
          <p class="text-xl font-semibold">Deposit Amount</p>
          <FormInput>
            <Label for="currency0-amount"> {{ store.symbol0 }} Amount </Label>
            <NumberInput
              v-model="store.state.currency0Amount"
              input-id="currency0-amount"
            >
              <template #trailing>
                <button
                  type="button"
                  class="cursor-pointer"
                  @click="store.state.currency0Amount = currency0Balance"
                >
                  MAX
                </button>
              </template>
            </NumberInput>
            <Hint>Balance: {{ currency0Balance }} {{ store.symbol0 }}</Hint>
          </FormInput>
          <FormInput>
            <Label for="currency1-amount"> {{ store.symbol1 }} Amount </Label>
            <NumberInput
              v-model="store.state.currency1Amount"
              disabled
              input-id="currency1-amount"
            >
            </NumberInput>
            <Hint>Balance: {{ currency1Balance }} {{ store.symbol1 }}</Hint>
          </FormInput>
          <FormInput>
            <Label for="price-range">Price Range</Label>
            <InlineInput
              :options="priceRangeOptions"
              v-model="store.state.liquidityType"
            />
          </FormInput>
          <PriceRangeSelector
            v-if="store.state.liquidityType === 'concentrated'"
          />
          <Tip>
            Price Range Tips:
            <ul class="grid gap-1 mt-1">
              <li v-for="tip in tips" :key="tip">
                {{ tip }}
              </li>
            </ul>
          </Tip>
          <Error v-for="error in store.errors" :key="error">
            {{ error }}
          </Error>
          <PoolCreationSummary />
        </Form>
        <UStepper
          v-model="currentStep"
          color="neutral"
          :items="items"
          class="w-full mt-4"
        />
        <template #footer>
          <div class="flex items-center gap-sm">
            <Button
              class="flex-1"
              type="button"
              color="reverse"
              @click="store.state.step--"
            >
              Previous
            </Button>
            <Button
              :disabled="isDisabled"
              :loading="store.state.loading"
              class="flex-1"
              type="button"
              @click="nextStep"
            >
              {{ buttonLabel }}
            </Button>
          </div>
        </template>
      </Card>
    </template>
  </PoolCreationInput>
</template>

<style scoped></style>
