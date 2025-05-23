<script setup lang="ts">
defineProps<{
  for: string;
}>();
</script>

<template>
  <label :for class="text-sm font-medium"><slot /></label>
</template>

<style scoped></style>
