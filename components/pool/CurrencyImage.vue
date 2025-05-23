<script setup lang="ts">
defineProps<{
  src?: string;
}>();
</script>

<template>
  <div class="rounded-full aspect-square bg-primary/20 p-1">
    <img
      v-if="src"
      :src
      alt="Currency Image"
      class="rounded-full object-cover w-full"
    />
  </div>
</template>

<style scoped></style>
