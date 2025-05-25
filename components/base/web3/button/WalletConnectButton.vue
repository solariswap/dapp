<script setup lang="ts">
import { useAppKitAccount } from "@reown/appkit/vue";
import Button from "~/components/base/input/Button.vue";
import { trimAddress } from "~/utils/function/address.function";
import WalletAccountModal from "~/components/base/web3/modal/WalletAccountModal.vue";
import { useWalletModalStore } from "~/store/web3/wallet-modal.store";

const { $modal } = useNuxtApp();
const account = useAppKitAccount();
const modalStore = useWalletModalStore();

const open = () => {
  $modal.open();
};

const focusIn = () => {
  modalStore.setOpened(true);
};

const focusOut = () => {
  setTimeout(() => {
    modalStore.setOpened(false);
  }, 200);
};

const isConnected = computed(() => account.value.isConnected);
const address = computed(() => account.value.address);
</script>

<template>
  <div class="relative">
    <Button
      v-if="!isConnected"
      class="w-full laptop:w-auto"
      leading-icon="lucide:wallet"
      @click="open"
    >
      Connect Wallet
    </Button>
    <Button
      v-else
      leading-icon="mdi:record-circle"
      icon-class="text-green-500"
      type="button"
      color="blue"
      class="w-full laptop:w-auto"
      @focusin="focusIn"
      @focusout="focusOut"
    >
      {{ trimAddress(address ?? "") }}
    </Button>
    <WalletAccountModal
      v-if="modalStore.opened"
      class="absolute top-full left-0 laptop:left-auto right-0 mt-2 min-w-[14rem]"
    />
  </div>
</template>

<style scoped></style>
