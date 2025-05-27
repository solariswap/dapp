<script setup lang="ts">
import { useAppKitAccount } from "@reown/appkit/vue";
import WalletConnectButton from "~/components/base/web3/button/WalletConnectButton.vue";
import Badge from "~/components/layout/Badge.vue";
import type { NavigationMenuItem } from "@nuxt/ui";

const account = useAppKitAccount();
const route = useRoute();

const expanded = ref(false);

const toggleIconName = computed(() =>
  expanded.value ? "mdi:times" : "uil:bars",
);

const linksClass = computed(() => {
  return expanded.value
    ? "mt-[1px] absolute !flex top-full flex-col inset-x-0 py-md px-md bg-background border-b border-border"
    : "";
});

const routes = [
  { name: "Swap", icon: "lucide:zap", path: "/" },
  { name: "Pools", icon: "lucide:droplets", path: "/pools" },
  {
    name: "More",
    type: "dropdown",
    links: [
      {
        name: "Analytics",
        description: "Track market data and trading volume",
        path: "#",
      },
      {
        name: "On-chain ETH",
        description: "Create fully on-chain ETFs",
        path: "#",
      },
    ],
  },
];

const items = ref<NavigationMenuItem[]>([
  { label: "Swap", icon: "lucide:zap", to: "/" },
  { label: "Pools", icon: "lucide:droplets", to: "/pools" },
  {
    label: "More",
    to: "#",
    children: [
      {
        label: "Analytics",
        description: "Track market data and trading volume",
        icon: "lucide:house",
        to: "#",
      },
      {
        label: "On-chain ETF",
        description: "Create fully on-chain ETFs",
        icon: "lucide:cloud-download",
        to: "#",
      },
    ],
  },
]);

const openWallet = () => {
  console.log(account.value);
  // $modal.open();
};
</script>

<template>
  <nav
    class="py-sm laptop:py-md border-b border-border fixed top-0 inset-x-0 bg-background z-50"
  >
    <div
      class="max-w-desktop mx-auto px-md desktop:px-0 flex items-center gap-lg"
    >
      <BaseLogo />
      <div
        class="hidden laptop:flex laptop:items-center gap-md flex-1"
        :class="linksClass"
      >
        <ul class="flex-1">
          <UNavigationMenu
            :orientation="expanded ? 'vertical' : 'horizontal'"
            :items="items"
            class="w-full text-3xl laptop:text-base"
          ></UNavigationMenu>
        </ul>
        <ul
          class="flex flex-col laptop:flex-row laptop:items-center gap-sm laptop:ml-auto"
        >
          <li>
            <Badge icon="mdi:circle">Helios Testnet</Badge>
          </li>
          <li>
            <WalletConnectButton class="w-full" />
          </li>
        </ul>
      </div>
      <button
        class="laptop:hidden ml-auto grid place-items-center p-2 pr-0"
        @click="expanded = !expanded"
      >
        <Icon :name="toggleIconName" />
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss"></style>
