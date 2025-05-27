<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: "default" | "outline";
  }>(),
  {
    type: "default",
  },
);

const cls = computed(() => {
  return {
    "hover:bg-accent": props.type === "default",
    "border-border border hover:text-accent-foreground hover:bg-yellow-500/10 hover:border-yellow-500/30":
      props.type === "outline",
  };
});
</script>

<template>
  <button
    type="button"
    class="rounded-lg aspect-square p-2 cursor-pointer grid place-items-center focus:outline-none focus-visible:ring-2 ring-ring"
    :class="cls"
  >
    <slot />
  </button>
</template>

<style scoped></style>
