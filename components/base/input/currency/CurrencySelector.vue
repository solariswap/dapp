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
    class="card bg-background flex items-center justify-between gap-sm hover:bg-accent cursor-pointer"
    @click="openPoolCreationModal"
  >
    <Currency
      v-if="model"
      :symbol="model.symbol"
      :name="model.name"
      :logo="model.logoURI"
    />
    <span class="text-sm text-muted-foreground font-bold">Select</span>
  </button>
</template>

<style scoped></style>
