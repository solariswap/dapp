<script setup lang="ts"></script>

<template>
  <div
    class="bg-accent/20 rounded-lg p-3 border border-accent/30 text-muted-foreground"
  >
    <div class="flex flex-start gap-2">
      <Icon name="mdi:info" />
      <p class="text-xs"><slot /></p>
    </div>
  </div>
</template>

<style scoped></style>
