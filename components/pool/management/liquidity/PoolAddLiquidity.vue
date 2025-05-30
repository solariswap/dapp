<script setup lang="ts">
import Form from "~/components/base/form/Form.vue";
import FormGroup from "~/components/base/form/FormGroup.vue";
import Label from "~/components/base/form/Label.vue";
import type { Pool } from "~/utils/type/base.type";
import NumberInput from "~/components/base/input/NumberInput.vue";
import FormInput from "~/components/base/form/FormInput.vue";
import Hint from "~/components/base/form/Hint.vue";
import Button from "~/components/base/input/Button.vue";

defineProps<{
  pool: Pool;
}>();

const balance0 = ref<number>(0);
const balance1 = ref<number>(0);

const lines = [
  {
    label: "Pool Share",
    value: "0.05%",
  },
  {
    label: "Estimated APR",
    value: "12.50%",
    class: "text-green-400",
  },
  {
    label: "Price Impact",
    value: "<0.01%",
    class: "text-green-400",
  },
];
</script>

<template>
  <div class="card large">
    <h3 class="text-2xl font-semibold leading-none tracking-tight">
      Add Liquidity
    </h3>
    <Form class="mt-6">
      <FormInput>
        <Label for="currency0-amount"> {{ pool.token0.symbol }} Amount </Label>
        <NumberInput placeholder="0.0">
          <template #trailing>{{ pool.token0.symbol }}</template>
        </NumberInput>
        <Hint>Balance: {{ balance0 }} {{ pool.token0.symbol }}</Hint>
      </FormInput>
      <FormInput>
        <Label for="currency1-amount"> {{ pool.token1.symbol }} Amount </Label>
        <NumberInput placeholder="0.0">
          <template #trailing>{{ pool.token1.symbol }}</template>
        </NumberInput>
        <Hint>Balance: {{ balance1 }} {{ pool.token1.symbol }}</Hint>
      </FormInput>
      <div class="bg-accent/40 rounded-lg p-4 flex flex-col gap-2">
        <div
          v-for="line in lines"
          :key="line.label"
          class="flex items-center gap-2 justify-between text-sm"
        >
          <p class="text-muted-foreground">{{ line.label }}</p>
          <p :class="line.class">{{ line.value }}</p>
        </div>
      </div>
      <Button>Deposit Liquidity</Button>
    </Form>
  </div>
</template>

<style scoped></style>
