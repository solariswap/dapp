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
  <div class="flex items-center gap-2">
    <button
      v-for="currency in currencies"
      :key="`popular-${currency.symbol}`"
      type="button"
      class="flex-1 bg-accent hover:bg-accent/80 p-xs rounded cursor-pointer grid place-items-center"
      @click="emit('select', currency)"
    >
      <Currency
        :symbol="currency.symbol"
        :name="currency.name"
        :logo="currency.logoURI"
        :logo-size="24"
        hide-name
      />
    </button>
  </div>
</template>

<style scoped></style>
