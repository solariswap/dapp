<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: "default" | "success" | "warning" | "error";
    size?: "sm" | "md";
  }>(),
  { type: "default", size: "md" },
);

const sizeCls = computed(() => ({
  "text-xs": props.size === "sm",
  "text-sm": props.size === "md",
}));

const colorCls = computed(() => ({
  "bg-accent text-accent-foreground": props.type === "default",
  "bg-green-500/20 text-green-400": props.type === "success",
  "bg-yellow-500/20 text-yellow-400": props.type === "warning",
  "bg-red-500/20 text-red-400": props.type === "error",
}));

const cls = computed(() => {
  return {
    ...sizeCls.value,
    ...colorCls.value,
  };
});
</script>

<template>
  <span class="px-2 py-0.5 rounded-full font-medium" :class="cls"
    ><slot
  /></span>
</template>

<style scoped></style>
