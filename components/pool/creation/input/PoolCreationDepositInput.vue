<script setup lang="ts">
import Card from "~/components/layout/Card.vue";
import PoolSummary from "~/components/pool/creation/summary/PoolSummary.vue";
import Form from "~/components/base/form/Form.vue";
import FormInput from "~/components/base/form/FormInput.vue";
import Label from "~/components/base/form/Label.vue";
import { usePoolCreationStore } from "~/store/pool-creation.store";
import NumberInput from "~/components/base/input/NumberInput.vue";
import Hint from "~/components/base/form/Hint.vue";

const store = usePoolCreationStore();

const currency0Balance = ref(0);
const currency1Balance = ref(0);
</script>

<template>
  <PoolCreationInput>
    <template #title>Finally, set your deposit amounts</template>
    <template #input>
      <PoolSummary />
      <Card>
        <Form>
          <p class="text-xl font-semibold">Deposit Amount</p>
          <FormInput>
            <Label for="currency0-amount"> {{ store.symbol0 }} Amount </Label>
            <NumberInput
              v-model="store.state.currency0Amount"
              input-id="currency0-amount"
            >
              <template #trailing>
                <button type="button" class="cursor-pointer">MAX</button>
              </template>
            </NumberInput>
            <Hint>Balance: {{ currency0Balance }} {{ store.symbol0 }}</Hint>
          </FormInput>
          <FormInput>
            <Label for="currency1-amount"> {{ store.symbol1 }} Amount </Label>
            <NumberInput
              v-model="store.state.currency1Amount"
              input-id="currency1-amount"
            >
              <template #trailing>
                <button type="button" class="cursor-pointer">MAX</button>
              </template>
            </NumberInput>
            <Hint>Balance: {{ currency1Balance }} {{ store.symbol1 }}</Hint>
          </FormInput>
        </Form>
      </Card>
    </template>
  </PoolCreationInput>
</template>

<style scoped></style>
