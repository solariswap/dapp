<script setup lang="ts">
import { usePoolCreationStore } from "~/store/pool-creation.store";

const poolCreationStore = usePoolCreationStore();

const steps = [
  { name: "Select token & fee tier" },
  { name: "Set initial price" },
  { name: "Deposit initial liquidity" },
];

const setStep = (step: number) => {
  if (poolCreationStore.state.step > step) {
    poolCreationStore.state.step = step;
  }
};
</script>

<template>
  <div class="flex flex-col gap-xs">
    <PoolCreationStep
      v-for="(step, k) in steps"
      :key="`step-${k}`"
      :active="poolCreationStore.state.step === k"
      :completed="poolCreationStore.state.step > k"
      :last="k + 1 === steps.length"
      :index="k + 1"
      @click="setStep(k)"
    >
      {{ step.name }}
    </PoolCreationStep>
  </div>
</template>

<style scoped></style>
