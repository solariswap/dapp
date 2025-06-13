<script setup lang="ts">
import { useSwapperStore } from "~/store/swapper.store";

const store = useSwapperStore();

const lines = computed(() => {
  const currency0 = store.state.model0.currency;
  const currency1 = store.state.model1.currency;

  const reversed = store.areTokenReversed([
    currency0.address,
    currency1.address,
  ]);
  const price = reversed
    ? 1 / store.state.pricePerToken0
    : store.state.pricePerToken0;

  return [
    {
      key: "Price",
      value: `1 ${store.state.model0.currency.symbol} = ${price} ${store.state.model1.currency.symbol}`,
    },
    {
      key: "Slippage tolerance",
      value: store.slippageTolerance,
    },
    { key: "Deadline", value: store.state.deadline + "s" },
  ];
});
</script>

<template>
  <div
    class="rounded p-sm bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 border border-purple-500/20"
  >
    <div class="flex flex-col gap-1 font-medium text-sm">
      <div
        v-for="line in lines"
        :key="line.key"
        class="flex items-center justify-between gap-2"
      >
        <p class="text-muted-foreground">{{ line.key }}</p>
        <p class="text-purple-400">
          {{ line.value }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
