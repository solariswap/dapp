<script setup lang="ts">
import { usePoolCreationStore } from "~/store/pool-creation.store";
import PoolTokensAndFeeInput from "~/components/pool/creation/input/PoolTokensAndFeeInput.vue";
import PoolCreationSteps from "~/components/pool/creation/step/PoolCreationSteps.vue";
import PoolInitialPriceInput from "~/components/pool/creation/input/PoolInitialPriceInput.vue";
import PoolCreationDepositInput from "~/components/pool/creation/input/PoolCreationDepositInput.vue";

const store = usePoolCreationStore();

const stepComponents = [
  PoolTokensAndFeeInput,
  PoolInitialPriceInput,
  PoolCreationDepositInput,
];
</script>

<template>
  <div class="grid laptop:grid-cols-6 gap-md">
    <div class="laptop:col-span-2">
      <PoolCreationSteps class="sticky top-(--nav-height-margin)" />
    </div>
    <div class="laptop:col-span-4">
      <component :is="stepComponents[store.state.step]" />
    </div>
  </div>
</template>

<style scoped></style>
