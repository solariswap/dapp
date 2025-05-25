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

const store = usePoolCreationStore();

const tabListItems = computed((): TabListItem[] => [
  { label: `${store.state.currency0?.symbol} Price`, value: "base_price" },
  { label: `${store.state.currency1?.symbol} Price`, value: "quote_price" },
]);

const priceRangeOptions: InlineInputOption<string>[] = [
  { label: "Full Range", value: "full" },
  { label: "Custom", value: "concentrated" },
];

const initialPriceTrailing = computed(() => {
  const symbol0 = store.state.currency0?.symbol;
  const symbol1 = store.state.currency1?.symbol;

  const way = store.state.basePrice === "base_price" ? 1 : 0;

  return `${way ? symbol0 : symbol1} per ${way ? symbol1 : symbol0}`;
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
              <template #trailing>
                {{ initialPriceTrailing }}
              </template>
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
        </Form>
      </Card>
    </template>
  </PoolCreationInput>
</template>

<style scoped></style>
