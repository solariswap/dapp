<script setup lang="ts">
import { trimAddress } from "~/utils/function/address.function";
import { useAppKitAccount, useDisconnect } from "@reown/appkit/vue";
import { useWeb3 } from "~/composables/web3/use-web3.composable";
import Separator from "~/components/layout/Separator.vue";
import { ethers } from "ethers";
import { formatCurrency } from "~/utils/function/currency.function";

const account = useAppKitAccount();
const web3 = useWeb3();

const address = computed(() => account.value.address);
const gasBalance = ref<number>();

onMounted(async () => {
  const balance = await web3.getBalance(address.value ?? "");

  const hlsStr = ethers.utils.formatEther(balance.toBigInt());

  gasBalance.value = parseFloat(hlsStr);
});

const buttons = [
  {
    label: "Copy Address",
    icon: "lucide:copy",
    action: () => {
      navigator.clipboard.writeText(address.value ?? "");
    },
  },
  {
    label: "View on Explorer",
    icon: "lucide:external-link",
    action: () => {
      window.open(
        `https://explorer.helioschainlabs.org/address/${address.value ?? ""}`,
        "_blank",
      );
    },
  },
];

const disconnect = () => {
  useDisconnect().disconnect();
};
</script>

<template>
  <div
    class="overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md p-1 whitespace-nowrap"
  >
    <div class="p-3 flex flex-col gap-xs">
      <div class="flex items-center gap-sm justify-between">
        <p class="text-sm">Connected Wallet</p>
        <div class="flex items-center gap-1 text-green-400">
          <Icon name="mdi:record-circle" />
          <p class="text-xs">Connected</p>
        </div>
      </div>
      <p class="text-sm text-muted-foreground">
        {{ trimAddress(address ?? "") }}
      </p>
      <div class="flex items-center justify-between gap-1 text-xs mt-xs">
        <p>HLS:</p>
        <USkeleton v-if="!gasBalance" class="h-4 w-[50px]" />
        <p v-else>{{ formatCurrency(gasBalance, "") }}</p>
      </div>
    </div>
    <Separator class="-mx-1 my-1" />
    <div class="flex flex-col">
      <button
        v-for="button in buttons"
        :key="button.label"
        type="button"
        class="px-3 py-1.5 text-sm rounded-sm outline-none hover:bg-accent cursor-pointer"
        @click="button.action"
      >
        <span class="flex gap-2 items-center">
          <Icon :name="button.icon" />
          <span>{{ button.label }}</span>
        </span>
      </button>
    </div>
    <Separator class="-mx-1 my-1" />
    <button
      class="px-3 py-1.5 text-sm rounded-sm outline-none hover:bg-accent cursor-pointer w-full"
      @click="disconnect"
    >
      <span class="flex gap-2 items-center text-error">
        <Icon name="lucide:log-out" />
        <span>Disconnect</span>
      </span>
    </button>
  </div>
</template>

<style scoped></style>
