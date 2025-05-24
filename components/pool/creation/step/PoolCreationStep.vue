<script setup lang="ts">
const props = defineProps<{
  active: boolean;
  completed: boolean;
  index: number;
  last: boolean;
}>();

const parentCls = computed(() => {
  return {
    "bg-accent text-accent-foreground": props.active,
    "text-muted-foreground": !props.active && !props.completed,
    "text-accent-foreground": props.completed,
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
      v-if="!last"
      class="absolute h-full top-1/2 w-[1px] bg-border translate-x-[19px]"
    ></span>
    <span
      v-if="!completed"
      class="w-10 rounded-full aspect-square grid place-items-center shrink-0 relative"
      :class="idxCls"
    >
      {{ index }}
    </span>
    <span
      v-else
      class="w-10 rounded-full aspect-square grid place-items-center shrink-0 relative bg-green-500 text-white"
    >
      <Icon name="material-symbols:check"></Icon>
    </span>
    <span class="text-left text-sm">
      <span class="block font-bold">Step {{ index }}</span>
      <span class="block"><slot /></span>
    </span>
  </button>
</template>

<style scoped></style>
