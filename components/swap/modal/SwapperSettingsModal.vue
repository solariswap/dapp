<script setup lang="ts">
import PopupModal from "~/components/layout/modal/PopupModal.vue";
import ModalHeader from "~/components/layout/modal/ModalHeader.vue";
import ModalBody from "~/components/layout/modal/ModalBody.vue";
import Form from "~/components/base/form/Form.vue";
import FormInput from "~/components/base/form/FormInput.vue";
import Label from "~/components/base/form/Label.vue";
import RangeInput from "~/components/base/input/RangeInput.vue";
import { useSwapperStore } from "~/store/swapper.store";
import InlineInput from "~/components/base/input/InlineInput.vue";
import type { InlineInputOption } from "~/utils/type/base.type";

const store = useSwapperStore();

const deadlineOptions: InlineInputOption<number>[] = [
  { label: "10s", value: 10 },
  { label: "20s", value: 20 },
  { label: "30s", value: 30 },
  { label: "60s", value: 60 },
];
</script>

<template>
  <PopupModal>
    <ModalHeader> Swap Settings </ModalHeader>
    <ModalBody>
      <Form>
        <FormInput>
          <Label for="slippage-tolerance"> Slippage tolerance </Label>
          <RangeInput
            :min="0.01 / 100"
            :max="5 / 100"
            :step="0.01 / 100"
            v-model="store.state.slippageTolerance"
          >
            <template #preview>
              <p class="min-w-12">
                {{ store.slippageTolerance }}
              </p>
            </template>
          </RangeInput>
        </FormInput>
        <FormInput>
          <Label for="deadline">Transaction Deadline</Label>
          <InlineInput
            :options="deadlineOptions"
            v-model="store.state.deadline"
          />
        </FormInput>
      </Form>
    </ModalBody>
  </PopupModal>
</template>

<style scoped></style>
