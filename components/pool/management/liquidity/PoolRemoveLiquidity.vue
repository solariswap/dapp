<script setup lang="ts">
import Form from "~/components/base/form/Form.vue";
import Label from "~/components/base/form/Label.vue";
import type { Pool } from "~/utils/type/base.type";
import NumberInput from "~/components/base/input/NumberInput.vue";
import FormInput from "~/components/base/form/FormInput.vue";
import Hint from "~/components/base/form/Hint.vue";
import Button from "~/components/base/input/Button.vue";
import { useAppKitAccount } from "@reown/appkit/vue";
import RangeInput from "~/components/base/input/RangeInput.vue";
import { TickMath } from "@uniswap/v3-sdk";
import { BigNumber, FixedNumber } from "ethers";
import { formatCurrency } from "~/utils/function/currency.function";

const props = defineProps<{
  pool: Pool;
}>();

const account = useAppKitAccount();

const percentToWithdraw = ref(10);

const currency0 = props.pool.token0;
const currency1 = props.pool.token1;

const tick = 200000;

const sqrtPriceX96 = TickMath.getSqrtRatioAtTick(tick);

const Q96 = BigNumber.from(2).pow(96);
const sqrtPrice =
  parseFloat(sqrtPriceX96.toString()) / parseFloat(Q96.toString());
const price = sqrtPrice ** 2;

const positionCurrency0 = 20;
const positionCurrency1 = 600;

const lines = computed(() => {
  const percent = percentToWithdraw.value / 100;
  return [
    {
      label: currency0.symbol,
      value: formatCurrency(positionCurrency0 * percent, ""),
    },
    {
      label: currency1.symbol,
      value: formatCurrency(positionCurrency1 * percent, ""),
    },
  ];
});

const feesEarned = computed(() => {
  return `0.6 ${currency0.symbol}`;
});
</script>

<template>
  <div class="card large">
    <h3 class="text-2xl font-semibold leading-none tracking-tight">
      Remove Liquidity
    </h3>
    <Form v-if="account.isConnected" class="mt-6">
      <FormInput>
        <Label for="amount-to-remove"> Amount To Remove </Label>
        <RangeInput :min="0" :max="100" :step="1" v-model="percentToWithdraw">
          <template #preview>
            <p class="min-w-12">{{ percentToWithdraw.toFixed(0) }}%</p>
          </template>
        </RangeInput>
      </FormInput>
      <div class="bg-accent/40 rounded-lg p-4 flex flex-col gap-2">
        <p class="text-muted-foreground">You will receive</p>
        <div
          v-for="line in lines"
          :key="line.label"
          class="flex items-center justify-between font-medium leading-tight"
        >
          <p>{{ line.label }}</p>
          <p>{{ line.value }}</p>
        </div>
        <USeparator />
        <div
          class="flex items-center justify-between text-sm font-medium leading-tight"
        >
          <p class="text-muted-foreground">Fees Earned</p>
          <p class="text-green-400">{{ feesEarned }}</p>
        </div>
      </div>
      <Button color="red-plain">Remove Liquidity</Button>
    </Form>
    <div v-else class="pt-lg px-lg grid place-items-center">
      <p class="text-muted-foreground">
        Connect your wallet to view your positions
      </p>
      <Button color="reverse" class="mt-sm"> Connect wallet </Button>
    </div>
  </div>
</template>

<style scoped></style>
