<script setup lang="ts">
import { NuxtLink } from "#components";

const props = withDefaults(
  defineProps<{
    to?: ReturnType<typeof useRoute> | string;
    color?: "default" | "reverse" | "blue" | "red" | "red-plain";
    iconClass?: string;
    iconSize?: number;
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
    "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-medium":
      props.color === "default",
    "bg-background hover:bg-accent hover:text-accent-foreground border border-border":
      props.color === "reverse",
    "bg-background border border-blue-500/30 hover:bg-blue-500/10":
      props.color === "blue",
    "bg-background border border-red-500/30 hover:bg-red-500/10":
      props.color === "red",
    "bg-destructive text-destructive-foreground hover:bg-destructive/90":
      props.color === "red-plain",
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
    <Icon
      v-if="leadingIcon"
      :class="iconClass"
      :size="iconSize"
      :name="leadingIcon"
    />
    <span><slot /></span>
    <Icon
      v-if="trailingIcon"
      :class="iconClass"
      :size="iconSize"
      :name="trailingIcon"
    />
  </component>
</template>

<style scoped></style>
