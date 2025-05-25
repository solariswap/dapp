<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: "default" | "error";
  }>(),
  {
    type: "default",
  },
);

const cls = computed(() => {
  return {
    "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20":
      props.type === "default",
    "bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/20 text-error":
      props.type === "error",
  };
});
</script>

<template>
  <div class="rounded-lg p-4" :class="cls">
    <slot />
  </div>
</template>

<style scoped></style>
