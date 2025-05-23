<script setup lang="ts">
import type { InlineInputOption } from "~/utils/type/base.type";
import InlineInput from "~/components/base/input/InlineInput.vue";

const feeOptions: InlineInputOption<number>[] = [
  { label: "0.001%", value: 0.001 },
  { label: "0.002%", value: 0.002 },
  { label: "0.005%", value: 0.005 },
  { label: "0.01%", value: 0.01 },
  { label: "0.02%", value: 0.02 },
];

const model = ref<InlineInputOption<number>>(feeOptions[0]);
</script>

<template>
  <InlineInput :options="feeOptions" v-model="model" />
</template>

<style scoped></style>
