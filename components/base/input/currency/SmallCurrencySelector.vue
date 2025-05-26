<script setup lang="ts">
import Currency from "~/components/pool/Currency.vue";
import type { TokenCurrency } from "~/utils/type/base.type";
import { useModalStore } from "~/store/layout/modal.store";
import TokenSelectorModal from "~/components/base/input/currency/modal/TokenSelectorModal.vue";

const modalStore = useModalStore();

const model = defineModel<TokenCurrency>();

const openPoolCreationModal = () => {
  modalStore.open(TokenSelectorModal, { model: toRef(model, "value") });
};
</script>

<template>
  <button
    type="button"
    class="flex items-center justify-between gap-xs cursor-pointer"
    @click="openPoolCreationModal"
  >
    <Currency
      v-if="model"
      :symbol="model.symbol"
      :name="model.name"
      :logo="model.logoURI"
      :logo-size="24"
      hide-name
      class="gap-xs"
    />
    <span class="text-sm font-bold grid place-items-center">
      <Icon name="lucide:chevron-down" />
    </span>
  </button>
</template>

<style scoped></style>
