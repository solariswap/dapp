<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();

const spans = computed(() => props.text.split(" "));

const SPAN_OFFSET = 0.2;

const getSpanStyle = (index: number) => {
  return {
    animationDelay: `${index * SPAN_OFFSET}s`,
  };
};
</script>

<template>
  <p class="flex flex-wrap gap-x-2">
    <span v-for="(span, k) in spans" :style="getSpanStyle(k)" :key="span">
      {{ span }}
    </span>
  </p>
</template>

<style scoped lang="scss">
span {
  animation: appear-from-bottom 0.5s ease-in-out forwards;
  opacity: 0;
}

@keyframes appear-from-bottom {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
