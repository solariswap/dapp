<script setup lang="ts">
import type { InlineInputOption } from "~/utils/type/base.type";

const props = defineProps<{
  options: InlineInputOption[];
}>();

const model = defineModel<(typeof props.options)[number]["value"]>();
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      v-for="option in options"
      :key="`inline-input-${option.value}`"
      :aria-selected="model === option.value"
      type="button"
      class="card p-2 text-center flex-1 bg-background cursor-pointer font-medium aria-selected:bg-primary aria-selected:text-primary-foreground"
      :class="{
        'hover:bg-accent': model !== option.value,
      }"
      @click="model = option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped></style>
