<script setup lang="ts">
defineProps<{
  titleClass?: string;
  direction?: "up" | "down";
}>();
</script>

<template>
  <div
    class="rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-to-r p-6"
  >
    <h3 class="tracking-tight text-sm font-bold" :class="titleClass">
      <slot name="name" />
    </h3>
    <p class="text-2xl font-extrabold mt-2"><slot name="value" /></p>
    <div class="flex items-center text-sm text-muted-foreground gap-1">
      <Icon
        :name="
          direction === 'up' ? 'lucide:trending-up' : 'lucide:trending-down'
        "
        :class="{
          'text-green-500': direction === 'up',
          'text-red-500': direction === 'down',
        }"
      />
      <p><slot name="footer" /></p>
    </div>
  </div>
</template>

<style scoped></style>
