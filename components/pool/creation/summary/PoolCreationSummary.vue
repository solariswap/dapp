<script setup lang="ts">
import { usePoolCreationStore } from "~/store/pool-creation.store";

const store = usePoolCreationStore();

const lines = [
  { label: "Price Range", value: store.priceRange },
  {
    label: "Initial Price",
    value: `${store.state.initialPrice.toPrecision(6)} ${store.priceLabel}`,
  },
];
</script>

<template>
  <div class="bg-accent/40 rounded-lg p-4 flex flex-col gap-2">
    <div
      v-for="line in lines"
      :key="line.label"
      class="flex items-center gap-2 justify-between text-sm"
    >
      <p class="text-muted-foreground">{{ line.label }}</p>
      <p>{{ line.value }}</p>
    </div>
  </div>
</template>

<style scoped></style>
