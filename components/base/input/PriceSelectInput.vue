<script setup lang="ts">
const model = defineModel<number>();

/**
 * Increase by 1%.
 */
const increase = () => {
  if (!model.value) return;

  model.value = model.value + model.value * 0.01;
};

/**
 * Decrease by 1%.
 */
const decrease = () => {
  if (!model.value) return;

  model.value = model.value - model.value * 0.01;
};
</script>

<template>
  <div
    class="flex items-stretch font-medium border border-input rounded has-focus-visible:ring-2 ring-ring bg-background text-foreground"
  >
    <button
      type="button"
      class="grid place-items-center border-border border-r w-10 cursor-pointer"
      @click="decrease"
    >
      <Icon name="mdi:minus" />
    </button>
    <input
      type="number"
      class="outline-none min-h-12 flex-1 text-center px-md"
      step=".00001"
      v-model.number="model"
    />
    <button
      type="button"
      class="grid place-items-center border-border border-l w-10 cursor-pointer"
      @click="increase"
    >
      <Icon name="mdi:plus" />
    </button>
  </div>
</template>

<style scoped></style>
