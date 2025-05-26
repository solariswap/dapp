<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon?: string;
    placeholder?: string;
    disabled?: boolean;
    step?: number;
    min?: number;
    max?: number;
    inputId?: string;
  }>(),
  { disabled: false },
);

const model = defineModel<number>();

const inputCls = computed(() => {
  return {
    "pl-11": !!props.icon,
  };
});

const slots = useSlots();

const hasTrailing = !!slots.trailing;
</script>

<template>
  <div
    class="px-3 relative bg-background border border-input rounded has-focus-visible:ring-2 ring-ring flex items-center gap-sm"
  >
    <Icon
      v-if="icon"
      :name="icon"
      size="24"
      class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
    />
    <input
      type="number"
      v-model.number="model"
      :placeholder="placeholder"
      :disabled="disabled"
      :id="inputId"
      :step="step"
      :min="min"
      :max="max"
      inputmode="numeric"
      class="text-lg flex-1 w-full focus:outline-none placeholder:text-muted-foreground min-h-12 disabled:cursor-not-allowed disabled:opacity-50"
      :class="inputCls"
    />
    <p v-if="hasTrailing" class="text-muted-foreground font-medium">
      <slot name="trailing" />
    </p>
  </div>
</template>

<style scoped></style>
