<script setup lang="ts">
import FormInput from "~/components/base/form/FormInput.vue";
import CurrencySelector from "~/components/base/input/CurrencySelector.vue";
import Card from "~/components/layout/Card.vue";
import PoolFeeInput from "~/components/pool/creation/input/PoolFeeInput.vue";
import Label from "~/components/base/form/Label.vue";
import Button from "~/components/base/input/Button.vue";
import Form from "~/components/base/form/Form.vue";
import { usePoolCreationStore } from "~/store/pool-creation.store";

const poolCreationStore = usePoolCreationStore();
</script>

<template>
  <PoolCreationInput>
    <template #title>First, choose your tokens</template>
    <template #input>
      <Card>
        <Form>
          <FormInput>
            <Label for="base-token">Base Token</Label>
            <CurrencySelector
              id="base-token"
              v-model="poolCreationStore.state.currency0"
            />
          </FormInput>
          <FormInput>
            <Label for="quote-token">Quote Token</Label>
            <CurrencySelector
              id="quote-token"
              v-model="poolCreationStore.state.currency1"
            />
          </FormInput>
          <FormInput>
            <Label for="pool-fee">Pool Fee</Label>
            <div class="overflow-auto w-full">
              <PoolFeeInput />
            </div>
          </FormInput>
        </Form>
        <template #footer>
          <Button class="w-full"> Continue </Button>
        </template>
      </Card>
    </template>
  </PoolCreationInput>
</template>

<style scoped></style>
