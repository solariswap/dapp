<script setup lang="ts">
import { NuxtLink } from "#components";

const props = withDefaults(
  defineProps<{
    to?: ReturnType<typeof useRoute> | string;
    disabled?: boolean;
    loading?: boolean;
    leadingIcon?: string;
    trailingIcon?: string;
  }>(),
  {
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
</script>

<template>
  <component
    :is="component"
    v-bind="attrs"
    class="button font-medium cursor-pointer bg-primary hover:bg-primary/80 text-primary-foreground py-2 px-4 rounded flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <Icon v-if="leadingIcon" :name="leadingIcon" />
    <span><slot /></span>
    <Icon v-if="trailingIcon" :name="trailingIcon" />
  </component>
</template>

<style scoped></style>
