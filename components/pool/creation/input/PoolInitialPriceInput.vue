<script setup lang="ts">
import Card from "~/components/layout/Card.vue";
import PoolSummary from "~/components/pool/creation/summary/PoolSummary.vue";
import Form from "~/components/base/form/Form.vue";
import FormInput from "~/components/base/form/FormInput.vue";
import Label from "~/components/base/form/Label.vue";
import TabListInput from "~/components/base/input/TabListInput.vue";
import type { TabListItem } from "~/utils/type/base.type";
import { usePoolCreationStore } from "~/store/pool-creation.store";
import NumberInput from "~/components/base/input/NumberInput.vue";
import Hint from "~/components/base/form/Hint.vue";
import Tick from "~/components/layout/Tick.vue";
import Tooltip from "~/components/layout/tooltip/Tooltip.vue";
import Button from "~/components/base/input/Button.vue";
import MarketPriceRecommandation from "~/components/pool/creation/summary/MarketPriceRecommandation.vue";
import { useQuoter } from "~/composables/pools/use-quoter.composable";
import { useSolariSwap } from "~/composables/web3/contracts/use-solari-swap.composable";
import { getTickFromAmounts } from "~/utils/function/tick.function";

const store = usePoolCreationStore();
const solariSwap = useSolariSwap();
const quoter = useQuoter();
const toast = useToast();

const marketPrice = await quoter.quoteExactInputSingle({
  tokenIn: store.state.currency0?.address ?? "",
  tokenOut: store.state.currency1?.address ?? "",
  fee: store.state.poolFee ?? 100,
  amountIn: 1,
  tokenInDecimals: store.state.currency0!.decimals,
  tokenOutDecimals: store.state.currency1!.decimals,
});
if (marketPrice) store.initMarketPrice(marketPrice.amountOut.toNumber());

watch(
  () => store.state.initialPrice,
  (after) => {
    store.initMarketPrice(after);

    if (store.state.currency0Amount) {
      store.state.currency1Amount = after * store.state.currency0Amount;
    }
  },
);

const tabListItems = computed((): TabListItem[] => [
  { label: `${store.state.currency0?.symbol} Price`, value: "base_price" },
  { label: `${store.state.currency1?.symbol} Price`, value: "quote_price" },
]);

const isDisabled = computed(() => {
  return store.errors.length > 0;
});

const nextStep = async () => {
  const basePrice = store.state.basePrice === "base_price";
  const amount0 = basePrice ? store.state.initialPrice : 1;
  const amount1 = basePrice ? 1 : store.state.initialPrice;

  const initialTick = getTickFromAmounts(
    amount0,
    amount1,
    store.state.currency0!.decimals,
    store.state.currency1!.decimals,
  );

  store.state.loading = true;
  try {
    await solariSwap.createPool({
      token0: store.state.currency0!.address,
      token1: store.state.currency1!.address,
      plFee: store.state.poolFee!,
      initialTick,
    });

    toast.add({
      color: "success",
      title: "Pool created!",
      description: "Please deposit the initial liquidity",
    });

    store.state.step++;
  } catch (e: any) {
    toast.add({
      color: "error",
      title: "Error creating the pool",
      description: e.reason,
    });

    if (e.reason.includes("already created")) {
      store.state.step++;
    }
  } finally {
    store.state.loading = false;
  }
};
</script>

<template>
  <PoolCreationInput>
    <template #title>Next, choose your pool initial price</template>
    <template #input>
      <PoolSummary />
      <Card>
        <Form>
          <p class="text-xl font-semibold">Price Setting</p>
          <FormInput>
            <TabListInput
              :items="tabListItems"
              v-model="store.state.basePrice"
              class="w-min"
            />
          </FormInput>
          <MarketPriceRecommandation
            v-if="marketPrice"
            :market-price="marketPrice"
            @click="store.state.initialPrice = marketPrice"
          />
          <FormInput>
            <Label for="initial-price">
              Initial Price
              <Tooltip>
                <template #tooltip>
                  Using a different price than the other pools can lead to
                  arbitrage
                </template>
              </Tooltip>
            </Label>
            <NumberInput
              id="initial-price"
              v-model="store.state.initialPrice"
              :min="0"
              :step="0.001"
            >
              <template #trailing>{{ store.priceLabel }}</template>
            </NumberInput>
            <p class="flex items-center justify-between gap-xs">
              <Hint>
                Set the starting price for your pool. Should be close to the
                current market price to prevent arbitrage.
              </Hint>
              <Tick size="sm" type="success">0.00%</Tick>
            </p>
          </FormInput>
        </Form>
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
              Continue
            </Button>
          </div>
        </template>
      </Card>
    </template>
  </PoolCreationInput>
</template>

<style scoped></style>
