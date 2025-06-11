<script setup lang="ts">
import FormInput from "~/components/base/form/FormInput.vue";
import CurrencySelector from "~/components/base/input/currency/CurrencySelector.vue";
import Card from "~/components/layout/Card.vue";
import PoolFeeInput from "~/components/pool/creation/input/PoolFeeInput.vue";
import Label from "~/components/base/form/Label.vue";
import Button from "~/components/base/input/Button.vue";
import Form from "~/components/base/form/Form.vue";
import { usePoolCreationStore } from "~/store/pool-creation.store";
import Tooltip from "~/components/layout/tooltip/Tooltip.vue";

const poolCreationStore = usePoolCreationStore();

watch(
  () => poolCreationStore.state.currency0,
  (after) => {
    if (!after) return;
    if (after?.address === poolCreationStore.state.currency1?.address)
      poolCreationStore.state.currency1 = undefined;
  },
);

watch(
  () => poolCreationStore.state.currency1,
  (after) => {
    if (!after) return;
    if (after?.address === poolCreationStore.state.currency0?.address)
      poolCreationStore.state.currency0 = undefined;
  },
);

// Sort the tokens before going to the next step.
const nextStep = () => {
  const [currency0, currency1] = [
    poolCreationStore.state.currency0,
    poolCreationStore.state.currency1,
  ];

  if (!currency0 || !currency1) return;

  if (currency1.address < currency0.address) {
    poolCreationStore.state.currency0 = currency1;
    poolCreationStore.state.currency1 = currency0;
  }

  poolCreationStore.nextStep();
};

const buttonDisabled = computed(() => {
  return (
    !poolCreationStore.state.currency0 ||
    !poolCreationStore.state.currency1 ||
    !poolCreationStore.state.poolFee
  );
});
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
            <Label for="pool-fee">
              Pool Fee
              <Tooltip>
                <template #tooltip>
                  How much fees you'll get at each swap
                </template>
              </Tooltip>
            </Label>
            <div class="overflow-auto w-full">
              <PoolFeeInput v-model="poolCreationStore.state.poolFee" />
            </div>
          </FormInput>
        </Form>
        <template #footer>
          <Button :disabled="buttonDisabled" class="w-full" @click="nextStep">
            Continue
          </Button>
        </template>
      </Card>
    </template>
  </PoolCreationInput>
</template>

<style scoped></style>
