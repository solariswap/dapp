<script setup lang="ts">
import CurrencyImage from "~/components/pool/CurrencyImage.vue";
import { trimAddress } from "~/utils/function/address.function";

withDefaults(
  defineProps<{
    symbol: string;
    name: string;
    address?: string;
    logo?: string;
    hideName?: boolean;
    logoSize?: number;
  }>(),
  {
    logoSize: 40,
  },
);
</script>

<template>
  <div class="flex items-center gap-sm">
    <CurrencyImage
      :style="{ width: `${logoSize}px`, height: `${logoSize}px` }"
      :src="logo"
    />
    <div class="leading-tight text-left">
      <p>{{ symbol.toUpperCase() }}</p>
      <p v-if="!hideName" class="text-sm text-muted-foreground">{{ name }}</p>
    </div>
    <p
      v-if="address"
      type="button"
      class="self-end ml-auto text-xs text-muted-foreground"
    >
      {{ trimAddress(address) }}
    </p>
  </div>
</template>

<style scoped></style>
