<script setup lang="ts">
import type { TokenCurrency } from "~/utils/type/base.type";
import Currency from "~/components/pool/Currency.vue";

defineProps<{
  currencies: TokenCurrency[];
}>();

const emit = defineEmits<{
  (e: "select", currency: TokenCurrency): void;
}>();
</script>

<template>
  <div class="flex flex-col gap-xs">
    <div class="flex items-center justify-between gap-sm text-xs px-xs">
      <p>Token</p>
      <p>Address</p>
    </div>
    <div class="overflow-y-auto flex-1">
      <button
        v-for="currency in currencies"
        :key="`cs-${currency.name}`"
        type="button"
        class="w-full py-xs px-xs hover:bg-accent"
        @click="emit('select', currency)"
      >
        <Currency
          :symbol="currency.symbol"
          :name="currency.name"
          :logo="currency.logoURI"
          :address="currency.address"
        />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
