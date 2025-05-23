<script setup lang="ts">
import { usePoolCreationStore } from "~/store/pool-creation.store";
import PoolTokensAndFeeInput from "~/components/pool/creation/input/PoolTokensAndFeeInput.vue";
import PoolCreationSteps from "~/components/pool/creation/step/PoolCreationSteps.vue";

const store = usePoolCreationStore();
</script>

<template>
  <div class="grid laptop:grid-cols-6 gap-md">
    <div class="laptop:col-span-2">
      <PoolCreationSteps />
    </div>
    <div class="laptop:col-span-4">
      <PoolTokensAndFeeInput />
    </div>
  </div>
</template>

<style scoped></style>
