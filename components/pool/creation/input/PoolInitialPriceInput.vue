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
import {
  getTickFromAmounts,
  tickToPrice,
} from "~/utils/function/tick.function";
import { usePoolManager } from "~/composables/pools/use-pool.composable";
import { useAppKitAccount } from "@reown/appkit/vue";
import type { FeeTier } from "~/utils/constant/fee.constant";

const store = usePoolCreationStore();
const poolManager = usePoolManager();
const solariSwap = useSolariSwap();
const quoter = useQuoter();
const toast = useToast();
const { $modal } = useNuxtApp();
const account = useAppKitAccount();

const marketPrice = ref<number>();

onMounted(async () => {
  const pool = await poolManager.getPoolFromCurrencies(
    store.state.currency0!,
    store.state.currency1!,
    true,
  );
  try {
    const tick = await pool.getTick();

    if (!tick) return;

    marketPrice.value = 1 / tickToPrice(tick);
    if (marketPrice.value) store.initMarketPrice(marketPrice.value);
  } catch {}
});

watch(
  () => store.state.initialPrice,
  (after) => {
    store.initMarketPrice(after);

    if (store.state.currency0Amount) {
      store.state.currency1Amount = after * store.state.currency0Amount;
    }
  },
);

watch(
  () => store.state.basePrice,
  () => {
    if (!marketPrice.value) return;

    const price = store.state.initialPrice ?? marketPrice.value;
    marketPrice.value = 1 / marketPrice.value;

    const percent = 0.2;
    store.state.priceRange = [price * (1 - percent), price * (1 + percent)];
  },
);

const marketPricePercent = computed(() => {
  if (!marketPrice.value) return null;

  const percent =
    ((store.state.initialPrice - marketPrice.value) / marketPrice.value) * 100;
  return percent.toFixed(2) + "%";
});

const tabListItems = computed((): TabListItem[] => [
  { label: `${store.state.currency0?.symbol} Price`, value: "base_price" },
  { label: `${store.state.currency1?.symbol} Price`, value: "quote_price" },
]);

const isDisabled = computed(() => {
  return store.errors.length > 0;
});

const token0PriceLabel = computed(() => {
  const [symbol0, symbol1] = [store.symbol0, store.symbol1];

  const pricePerSymbol0 =
    store.state.basePrice === "base_price"
      ? 1 / store.state.initialPrice
      : store.state.initialPrice;

  return `1 ${symbol0} ≈ ${pricePerSymbol0.toFixed(6)} ${symbol1}`;
});

const token1PriceLabel = computed(() => {
  const [symbol0, symbol1] = [store.symbol0, store.symbol1];

  const pricePerSymbol1 =
    store.state.basePrice === "base_price"
      ? store.state.initialPrice
      : 1 / store.state.initialPrice;

  return `1 ${symbol1} ≈ ${pricePerSymbol1.toFixed(6)} ${symbol0}`;
});

const nextStep = async () => {
  if (!account.value.isConnected) return $modal.open();

  const basePrice = store.state.basePrice === "base_price";
  const amount0 = basePrice ? store.state.initialPrice : 1;
  const amount1 = basePrice ? 1 : store.state.initialPrice;
  const currency0Decimals = basePrice
    ? store.state.currency0!.decimals
    : store.state.currency1!.decimals;
  const currency1Decimals = basePrice
    ? store.state.currency1!.decimals
    : store.state.currency0!.decimals;

  const initialTick = getTickFromAmounts(
    amount0,
    amount1,
    currency0Decimals,
    currency1Decimals,
    store.state.poolFee! as FeeTier,
  );

  // console.log("initialTick", initialTick);
  // return;

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
    if (e.reason.includes("already created")) {
      store.state.step++;
    } else {
      toast.add({
        color: "error",
        title: "Error creating the pool",
        description: e.reason,
      });
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
              <Tick v-if="marketPricePercent !== null" size="sm" type="success">
                {{ marketPricePercent }}
              </Tick>
            </p>
            <p class="text-xs">
              {{ token0PriceLabel }}
            </p>
            <p class="text-xs">
              {{ token1PriceLabel }}
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
