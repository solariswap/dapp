<script setup lang="ts">
import Card from "~/components/layout/Card.vue";
import PoolSummary from "~/components/pool/creation/summary/PoolSummary.vue";
import Form from "~/components/base/form/Form.vue";
import FormInput from "~/components/base/form/FormInput.vue";
import Label from "~/components/base/form/Label.vue";
import TabListInput from "~/components/base/input/TabListInput.vue";
import type { InlineInputOption, TabListItem } from "~/utils/type/base.type";
import { usePoolCreationStore } from "~/store/pool-creation.store";
import NumberInput from "~/components/base/input/NumberInput.vue";
import Hint from "~/components/base/form/Hint.vue";
import Tick from "~/components/layout/Tick.vue";
import Tooltip from "~/components/layout/tooltip/Tooltip.vue";
import InlineInput from "~/components/base/input/InlineInput.vue";
import PriceRangeSelector from "~/components/pool/creation/range/PriceRangeSelector.vue";
import Button from "~/components/base/input/Button.vue";
import Tip from "~/components/layout/Tip.vue";
import { usePoolPrice } from "~/composables/pools/use-pool-price.composable";
import MarketPriceRecommandation from "~/components/pool/creation/summary/MarketPriceRecommandation.vue";
import Error from "~/components/layout/Error.vue";

const store = usePoolCreationStore();
const poolPrice = usePoolPrice();

const marketPrice = await poolPrice.getQuote(
  store.state.currency0?.symbol ?? "",
  store.state.currency1?.symbol ?? "",
);
if (marketPrice) store.initMarketPrice(marketPrice);

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

const isDisabled = computed(() => {
  return store.errors.length > 0;
});
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
                Set the starting price for your liquidity. Should be close to
                the current market price to prevent arbitrage.
              </Hint>
              <Tick size="sm" type="success">0.00%</Tick>
            </p>
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
              class="flex-1"
              type="button"
              @click="store.state.step++"
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
