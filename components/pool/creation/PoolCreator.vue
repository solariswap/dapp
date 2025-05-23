<script setup lang="ts">
import { usePoolCreationStore } from "~/store/pool-creation.store";
import PoolTokensAndFeeInput from "~/components/pool/creation/input/PoolTokensAndFeeInput.vue";

const store = usePoolCreationStore();
</script>

<template>
  <div class="grid grid-cols-6 gap-md">
    <div class="col-span-2 h-6"></div>
    <div class="col-span-4 h-6">
      <PoolTokensAndFeeInput />
    </div>
  </div>
</template>

<style scoped></style>
