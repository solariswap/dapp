<script setup lang="ts">
import CurrencyImage from "~/components/pool/CurrencyImage.vue";

defineProps<{
  symbol: string;
  name: string;
  logo?: string;
}>();
</script>

<template>
  <div class="flex items-center gap-sm">
    <CurrencyImage class="w-10" :src="logo" />
    <div class="leading-tight text-left">
      <p>{{ symbol.toUpperCase() }}</p>
      <p class="text-sm text-muted-foreground">{{ name }}</p>
    </div>
  </div>
</template>

<style scoped></style>
