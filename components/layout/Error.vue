<script setup lang="ts">
import Alert from "~/components/layout/Alert.vue";
</script>

<template>
  <Alert type="error">
    <div class="flex flex-start gap-xs">
      <Icon name="mdi:info" class="mt-0.5" />
      <div class="font-medium">
        <p class="text-sm">Error</p>
        <p class="text-xs"><slot /></p>
      </div>
    </div>
  </Alert>
</template>

<style scoped></style>
