<script setup lang="ts">
import type { InlineInputOption } from "~/utils/type/base.type";

const props = defineProps<{
  options: InlineInputOption[];
}>();

const model = defineModel<(typeof props.options)[number]>();
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      v-for="option in options"
      :key="`inline-input-${option.value}`"
      type="button"
      class="card p-2 text-center flex-1 bg-background cursor-pointer"
      :class="{
        'bg-primary text-primary-foreground font-medium':
          model?.value === option.value,
        'hover:bg-accent': model?.value !== option.value,
      }"
      @click="model = option"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped></style>
