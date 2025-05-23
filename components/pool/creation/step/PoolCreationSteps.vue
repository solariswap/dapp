<script setup lang="ts">
const steps = [
  { name: "Select token & fee tier" },
  { name: "Set initial price" },
  { name: "Deposit initial liquidity" },
];

const value = ref(0);
</script>

<template>
  <div class="flex flex-col gap-xs">
    <PoolCreationStep
      v-for="(step, k) in steps"
      :key="`step-${k}`"
      :active="value === k"
      :completed="value < k"
      :index="k + 1"
    >
      {{ step.name }}
    </PoolCreationStep>
  </div>
</template>

<style scoped></style>
