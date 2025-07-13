<script setup lang="ts">
import Currency from "~/components/pool/Currency.vue";
import { useModalStore } from "~/store/layout/modal.store";
import TokenSelectorModal from "~/components/base/input/currency/modal/TokenSelectorModal.vue";
import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";

const modalStore = useModalStore();

const model = defineModel<Hrc20Entity>();

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
      :logo="model.logoUri"
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
