<script setup lang="ts">
import Form from "~/components/base/form/Form.vue";
import FormGroup from "~/components/base/form/FormGroup.vue";
import Label from "~/components/base/form/Label.vue";
import type { Pool } from "~/utils/type/base.type";
import NumberInput from "~/components/base/input/NumberInput.vue";
import FormInput from "~/components/base/form/FormInput.vue";

defineProps<{
  pool: Pool;
}>();
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
      </FormInput>
    </Form>
  </div>
</template>

<style scoped></style>
