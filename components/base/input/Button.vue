<script setup lang="ts">
import { NuxtLink } from "#components";

const props = withDefaults(
  defineProps<{
    to?: ReturnType<typeof useRoute> | string;
    color?: "default" | "reverse" | "blue";
    disabled?: boolean;
    loading?: boolean;
    leadingIcon?: string;
    trailingIcon?: string;
  }>(),
  {
    color: "default",
    disabled: false,
    loading: false,
  },
);

const component = computed(() => {
  return props.to ? NuxtLink : "button";
});

const attrs = computed(() => {
  const attributes: Record<string, unknown> = {};

  if (props.to) {
    attributes.to = props.to;
  }

  if (props.disabled || props.loading) {
    attributes.disabled = true;
  }

  return attributes;
});

const btnClass = computed(() => {
  return {
    "bg-primary hover:bg-primary/80 text-primary-foreground":
      props.color === "default",
    "bg-background hover:bg-accent hover:text-accent-foreground border border-border":
      props.color === "reverse",
    "bg-background border border-blue-500/30 hover:bg-blue-500/10":
      props.color === "blue",
  };
});
</script>

<template>
  <component
    :is="component"
    v-bind="attrs"
    class="button font-medium cursor-pointer py-2 px-4 rounded flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
    :class="btnClass"
  >
    <Icon v-if="leadingIcon" :name="leadingIcon" />
    <span><slot /></span>
    <Icon v-if="trailingIcon" :name="trailingIcon" />
  </component>
</template>

<style scoped></style>
