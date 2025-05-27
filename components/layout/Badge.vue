<script setup lang="ts">
defineProps<{
  icon?: string;
}>();
</script>

<template>
  <div>
    <div
      class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs"
    >
      <Icon v-if="icon" :name="icon" />
      <span class="font-medium"><slot /></span>
    </div>
  </div>
</template>

<style scoped></style>
