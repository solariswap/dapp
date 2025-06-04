<script setup lang="ts">
import type { TabListItem } from "~/utils/type/base.type";

defineProps<{
  items: TabListItem[];
}>();

const uid = useId();
const model = defineModel<TabListItem["value"]>();
</script>

<template>
  <div
    role="tablist"
    aria-orientation="horizontal"
    tabindex="0"
    class="outline-none flex items-center rounded-md bg-muted p-1 text-muted-foreground"
  >
    <button
      v-for="item in items"
      :key="`${uid}-${item.value}`"
      :aria-selected="item.value === model"
      type="button"
      class="whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium cursor-pointer aria-selected:shadow-sm aria-selected:text-foreground aria-selected:bg-background w-full"
      @click="model = item.value"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style scoped></style>
