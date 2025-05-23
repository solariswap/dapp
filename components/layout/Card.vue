<script setup lang="ts">
const slots = useSlots();

const hasFooter = computed(() => !!slots.footer);
</script>

<template>
  <div>
    <div class="card" :class="{ 'border-b-0 rounded-b-none': hasFooter }">
      <slot />
    </div>
    <div
      v-if="hasFooter"
      class="border border-border rounded-b-lg p-sm bg-card"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped></style>
