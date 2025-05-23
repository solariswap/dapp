<script setup lang="ts">
const props = defineProps<{
  active: boolean;
  completed: boolean;
  index: number;
}>();

const parentCls = computed(() => {
  return {
    "bg-accent text-accent-foreground": props.active,
    "text-muted-foreground": !props.active,
  };
});

const idxCls = computed(() => {
  return {
    "bg-primary text-primary-foreground": props.active,
    "bg-muted text-muted-foreground": !props.active,
  };
});
</script>

<template>
  <button
    class="relative rounded-lg p-4 flex items-center gap-sm cursor-pointer"
    :class="parentCls"
  >
    <span
      class="w-12 rounded-full aspect-square grid place-items-center shrink-0"
      :class="idxCls"
    >
      {{ index }}
    </span>
    <span class="text-left text-sm">
      <span class="block font-bold">Step {{ index }}</span>
      <span class="block"><slot /></span>
    </span>
  </button>
</template>

<style scoped></style>
