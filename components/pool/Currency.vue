<script setup lang="ts">
import CurrencyImage from "~/components/pool/CurrencyImage.vue";

defineProps<{
  symbol: string;
  logo?: string;
}>();
</script>

<template>
  <div class="flex items-center gap-sm">
    <CurrencyImage class="w-8" :src="logo" />
    <p>{{ symbol.toUpperCase() }}</p>
  </div>
</template>

<style scoped></style>
