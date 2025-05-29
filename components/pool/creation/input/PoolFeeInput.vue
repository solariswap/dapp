<script setup lang="ts">
import type { InlineInputOption } from "~/utils/type/base.type";
import InlineInput from "~/components/base/input/InlineInput.vue";

const feeOptions: InlineInputOption<number>[] = [
  { label: "0.25%", value: 0.0025 },
  { label: "0.5%", value: 0.005 },
  { label: "1%", value: 0.01 },
  { label: "2%", value: 0.02 },
  { label: "5%", value: 0.05 },
];

const model = ref<number>(feeOptions[0].value);
</script>

<template>
  <InlineInput :options="feeOptions" v-model="model" />
</template>

<style scoped></style>
