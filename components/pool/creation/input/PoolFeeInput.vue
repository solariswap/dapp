<script setup lang="ts">
import type { InlineInputOption } from "~/utils/type/base.type";
import InlineInput from "~/components/base/input/InlineInput.vue";

const feeOptions: InlineInputOption<number>[] = [
  { label: "0.01%", value: 100 },
  { label: "0.05%", value: 500 },
  { label: "0.3%", value: 3000 },
  { label: "1%", value: 10000 },
];

const model = ref<number>(feeOptions[1].value);
</script>

<template>
  <InlineInput :options="feeOptions" v-model="model" />
</template>

<style scoped></style>
