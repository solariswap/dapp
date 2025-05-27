<script setup lang="ts">
const props = defineProps<{
  min: number;
  max: number;
  step?: number;
  inputId?: string;
}>();

const model = defineModel<number>({ required: true });
const slots = useSlots();

const percent = computed(() => {
  return `${((model.value - props.min) / (props.max - props.min)) * 100}%`;
});
</script>

<template>
  <div class="flex items-center gap-xs">
    <input
      type="range"
      :min
      :max
      :step
      :id="inputId"
      v-model="model"
      class="flex-1"
    />
    <div v-if="slots.preview" class="bg-muted px-3 py-1 rounded-md text-center">
      <slot name="preview" />
    </div>
  </div>
</template>

<style scoped lang="scss">
input {
  -webkit-appearance: none;
  width: 100%;
  height: 0.5rem;
  border-radius: 0.5rem;
  background-image:
    linear-gradient(var(--color-primary), var(--color-primary)),
    linear-gradient(var(--color-secondary), var(--color-secondary));
  background-size:
    v-bind(percent) 0.5rem,
    100% 0.5rem;
  background-repeat: no-repeat no-repeat;
  background-position: left;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 2px solid var(--color-primary);
    background-color: var(--color-background);
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 2px solid var(--color-primary);
    background-color: var(--color-background);
    cursor: pointer;
  }
}
</style>
