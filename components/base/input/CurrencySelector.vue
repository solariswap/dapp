<script setup lang="ts">
import Currency from "~/components/pool/Currency.vue";
</script>

<template>
  <button
    type="button"
    class="card bg-background flex items-center justify-between gap-sm hover:bg-accent"
  >
    <Currency
      symbol="USDT"
      logo="https://altcoinsbox.com/wp-content/uploads/2023/01/tether-logo.webp"
    />
    <span class="text-sm text-muted-foreground">Select</span>
  </button>
</template>

<style scoped></style>
