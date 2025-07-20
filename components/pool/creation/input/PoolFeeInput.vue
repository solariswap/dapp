<script setup lang="ts">
import type { InlineInputOption } from "~/utils/type/base.type";
import InlineInput from "~/components/base/input/InlineInput.vue";
import type { FeeTier } from "~/utils/constant/fee.constant";

const props = defineProps<{
  enabled: FeeTier[];
}>();

const feeOptions = computed((): InlineInputOption<number>[] => [
  { label: "0.01%", value: 100, disabled: !props.enabled.includes(100) },
  { label: "0.05%", value: 500, disabled: !props.enabled.includes(500) },
  { label: "0.3%", value: 3000, disabled: !props.enabled.includes(3000) },
  { label: "1%", value: 10000, disabled: !props.enabled.includes(10000) },
]);

const model = ref<number>(feeOptions.value[1].value);
</script>

<template>
  <InlineInput :options="feeOptions" v-model="model" />
</template>

<style scoped></style>
