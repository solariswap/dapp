<script setup lang="ts">
defineProps<{
  src?: string;
  symbol: string;
}>();
</script>

<template>
  <div class="rounded-full aspect-square bg-primary/20 p-1 shrink-0">
    <img
      v-if="src"
      :src
      alt="Currency Image"
      class="rounded-full object-contain w-full h-full"
    />
    <p
      v-else
      class="grid place-items-center w-full h-full text-xs leading-tight font-bold"
    >
      {{ symbol[0] }}
    </p>
  </div>
</template>

<style scoped></style>
