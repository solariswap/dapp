<script setup lang="ts">
const props = defineProps<{
  icon?: string;
  placeholder?: string;
}>();

const model = defineModel<string>();
</script>

<template>
  <div
    class="relative border border-input rounded has-focus-visible:ring-2 ring-ring"
  >
    <Icon
      v-if="icon"
      :name="icon"
      size="24"
      class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
    ></Icon>
    <input
      type="text"
      v-model="model"
      :placeholder
      class="px-3 py-2 text-sm flex-1 w-full focus:outline-none placeholder:text-muted-foreground pl-11"
    />
  </div>
</template>

<style scoped></style>
