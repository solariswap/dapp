<script setup lang="ts">
import Currency from "~/components/pool/Currency.vue";
import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";

defineProps<{
  currencies: Hrc20Entity[];
}>();

const emit = defineEmits<{
  (e: "select", currency: Hrc20Entity): void;
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
        :logo="currency.logoUri"
        :logo-size="24"
        hide-name
      />
    </button>
  </div>
</template>

<style scoped></style>
