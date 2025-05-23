<script setup lang="ts">
import { useModalStore } from "~/store/layout/modal.store";
import SquareButton from "~/components/base/input/SquareButton.vue";

const modalStore = useModalStore();

const close = () => {
  modalStore.close();
};
</script>

<template>
  <div class="flex items-center gap-2 justify-between">
    <p class="text-lg font-bold"><slot /></p>
    <SquareButton class="text-2xl leading-tight w-10 h-10" @click="close">
      <Icon name="mdi:times" class="!w-full !h-full" />
    </SquareButton>
  </div>
</template>

<style scoped></style>
