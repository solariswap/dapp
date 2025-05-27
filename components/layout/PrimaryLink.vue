<script setup lang="ts">
defineProps<{
  to: ReturnType<typeof useRoute> | string;
}>();
</script>

<template>
  <nuxt-link class="text-sm text-muted-foreground hover:text-yellow-400" :to>
    <slot />
  </nuxt-link>
</template>

<style scoped></style>
