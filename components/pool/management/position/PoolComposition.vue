<script setup lang="ts">
import type { Pool } from "~/utils/type/base.type";
import { formatCurrency } from "~/utils/function/currency.function";

const props = defineProps<{
  pool: Pool;
}>();

const symbol0 = props.pool.token0.symbol;
const symbol1 = props.pool.token1.symbol;

const lines = computed(() => [
  { currency: symbol0, amount: 400, percent: 51 },
  { currency: symbol1, amount: 60000, percent: 49 },
]);
</script>

<template>
  <div class="card large">
    <p class="text-2xl font-semibold leading-none tracking-tight">
      Pool Composition
    </p>
    <div class="flex flex-col gap-4 mt-md">
      <div v-for="line in lines" :key="`smry-${line.currency}`">
        <div class="flex items-center justify-between gap-2 font-bold">
          <p>{{ line.currency }}</p>
          <p>{{ line.percent.toFixed(2) }}%</p>
        </div>
        <UProgress v-model="line.percent" />
        <p class="text-sm text-muted-foreground mt-0.5">
          Reserve: {{ formatCurrency(line.amount, "") }} {{ line.currency }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
