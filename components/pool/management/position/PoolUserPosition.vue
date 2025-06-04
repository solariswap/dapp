<script setup lang="ts">
import type { Pool } from "~/utils/type/base.type";
import { formatCurrency } from "~/utils/function/currency.function";

const props = defineProps<{
  pool: Pool;
}>();

const symbol0 = props.pool.token0.symbol;
const symbol1 = props.pool.token1.symbol;

const lines = computed(() => [
  {
    label: symbol0,
    value: formatCurrency(20, ""),
  },
  {
    label: symbol1,
    value: formatCurrency(600, ""),
  },
  {
    label: "Pool Share",
    value: "0.23%",
  },
  {
    label: "Fees Earned",
    value: `0.6 ${symbol0}`,
    class: "text-green-400",
  },
]);
</script>

<template>
  <div
    class="rounded-lg border bg-card text-card-foreground bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20 p-6"
  >
    <p
      class="text-2xl font-semibold leading-none tracking-tight text-green-400"
    >
      Your Position
    </p>
    <div class="flex flex-col gap-xs mt-md">
      <div
        v-for="line in lines"
        :key="line.label"
        class="flex items-center justify-between gap-2 font-bold"
      >
        <p class="text-muted-foreground">{{ line.label }}</p>
        <p :class="line.class">{{ line.value }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
