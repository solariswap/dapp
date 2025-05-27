<script setup lang="ts">
import Card from "~/components/layout/Card.vue";
import SquareButton from "~/components/base/input/SquareButton.vue";
import TokenAmountInput from "~/components/base/input/TokenAmountInput.vue";
import type { TokenAmountModel } from "~/utils/type/base.type";
import { currencies } from "~/utils/constant/currency.constant";
import Button from "~/components/base/input/Button.vue";
import { useSwapperStore } from "~/store/swapper.store";
import { useModalStore } from "~/store/layout/modal.store";
import SwapperSettingsModal from "~/components/swap/modal/SwapperSettingsModal.vue";

const store = useSwapperStore();
const modalStore = useModalStore();

const openSettings = () => {
  modalStore.open(SwapperSettingsModal);
};
</script>

<template>
  <Card class="max-w-[28rem] w-full">
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2 justify-between text-lg font-medium">
        <p>Swap</p>
        <SquareButton @click="openSettings">
          <Icon name="lucide:settings" />
        </SquareButton>
      </div>
      <TokenAmountInput v-model="store.state.model0"> From </TokenAmountInput>
      <div class="flex items-center justify-center -my-6 relative">
        <div
          class="rounded-full aspect-square w-10 gap-2 grid place-items-center bg-gradient-to-r from-yellow-500 to-orange-500"
        >
          <Icon name="lucide:arrow-down" />
        </div>
      </div>
      <TokenAmountInput v-model="store.state.model1"> To </TokenAmountInput>
      <SwapSummary />
      <Button>Swap</Button>
    </div>
  </Card>
</template>

<style scoped></style>
