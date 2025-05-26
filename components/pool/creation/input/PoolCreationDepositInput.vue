<script setup lang="ts">
import Card from "~/components/layout/Card.vue";
import PoolSummary from "~/components/pool/creation/summary/PoolSummary.vue";
import Form from "~/components/base/form/Form.vue";
import FormInput from "~/components/base/form/FormInput.vue";
import Label from "~/components/base/form/Label.vue";
import { usePoolCreationStore } from "~/store/pool-creation.store";
import NumberInput from "~/components/base/input/NumberInput.vue";
import Hint from "~/components/base/form/Hint.vue";
import Button from "~/components/base/input/Button.vue";
import { useAppKitAccount } from "@reown/appkit/vue";

const store = usePoolCreationStore();
const account = useAppKitAccount();

const currency0Balance = ref(0);
const currency1Balance = ref(0);

watch(
  () => store.state.currency0Amount,
  (after) => {
    const rate = store.state.initialPrice;

    store.state.currency1Amount = after * rate;
  },
);

const buttonLabel = computed(() => {
  return !account.value.isConnected ? "Please connect your wallet" : "Continue";
});

const isDisabled = computed(() => {
  if (store.state.currency0Amount <= 0) return true;

  return !account.value.isConnected;
});
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
                <button
                  type="button"
                  class="cursor-pointer"
                  @click="store.state.currency0Amount = currency0Balance"
                >
                  MAX
                </button>
              </template>
            </NumberInput>
            <Hint>Balance: {{ currency0Balance }} {{ store.symbol0 }}</Hint>
          </FormInput>
          <FormInput>
            <Label for="currency1-amount"> {{ store.symbol1 }} Amount </Label>
            <NumberInput
              v-model="store.state.currency1Amount"
              disabled
              input-id="currency1-amount"
            >
            </NumberInput>
            <Hint>Balance: {{ currency1Balance }} {{ store.symbol1 }}</Hint>
          </FormInput>
          <PoolCreationSummary />
        </Form>
        <template #footer>
          <div class="flex items-center gap-sm">
            <Button
              class="flex-1"
              type="button"
              color="reverse"
              @click="store.state.step--"
            >
              Previous
            </Button>
            <Button
              :disabled="isDisabled"
              class="flex-1"
              type="button"
              @click="store.state.step++"
            >
              {{ buttonLabel }}
            </Button>
          </div>
        </template>
      </Card>
    </template>
  </PoolCreationInput>
</template>

<style scoped></style>
