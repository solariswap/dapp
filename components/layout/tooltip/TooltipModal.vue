<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    position?: "top" | "bottom" | "left" | "right";
    maxWidth?: number;
    offsetX?: number;
  }>(),
  {
    position: "top",
    maxWidth: 200,
    offsetX: 0,
  },
);

const translateX = computed(() => {
  const offsetMargin = 30;
  return Math.floor(Math.min(props.offsetX, props.maxWidth - offsetMargin));
});
const styleTranslateX = computed(() => {
  return `${translateX.value}px`;
});

const tooltipClass = computed(() => {
  return {
    [`tooltip-modal-${props.position}`]: true,
  };
});
const tooltipStyle = computed(() => {
  let x = `translateX(${styleTranslateX.value})`;
  if (props.position === "top" || props.position === "bottom") {
    x = `translateX(calc(-50% + ${styleTranslateX.value}))`;
  }

  let y = "";
  if (props.position === "left" || props.position === "right") {
    y = `translateY(-50%)`;
  }

  return {
    transform: `${x} ${y}`,
  };
});
</script>

<template>
  <div class="tooltip-modal" :class="tooltipClass" :style="tooltipStyle">
    <div class="tooltip-modal__inner">
      <div class="tooltip-modal__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tooltip-modal {
  white-space: normal;
  text-wrap: wrap;
  width: max-content;

  --rectangle-size: 0.8rem;
  --padding: calc(var(--rectangle-size) - 0.2rem);
  --translateX: v-bind(styleTranslateX);

  --square-translate-x: 0px;
  --square-translate-y: 0px;

  &__inner {
    padding-inline: var(--spacing-lg);
    padding-block: var(--spacing-sm);
    border-radius: var(--radius-md);
    background-color: var(--color-gray-900);

    color: var(--color-white);
    font-weight: 500;
    font-size: var(--text-xs);

    position: relative;

    &::after {
      content: "";

      width: var(--rectangle-size);

      transform: translateX(
          calc(var(--translateX) * -1 + var(--square-translate-x))
        )
        translateY(var(--square-translate-y)) rotate(45deg);

      position: absolute;
      aspect-ratio: 1/1;
      background: var(--color-gray-900);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    gap: var(--spacing-xs);
  }

  &.tooltip-modal-top {
    padding-bottom: var(--padding);

    .tooltip-modal__inner::after {
      left: 50%;

      --square-translate-x: -50%;

      bottom: calc(var(--padding) * -0.5);
    }
  }

  &.tooltip-modal-bottom {
    padding-top: var(--padding);

    .tooltip-modal__inner::after {
      left: 50%;

      --square-translate-x: -50%;

      top: calc(var(--padding) * -0.5);
    }
  }

  &.tooltip-modal-left {
    padding-right: var(--padding);

    .tooltip-modal__inner::after {
      top: 50%;

      --square-translate-y: -50%;
      right: calc(var(--padding) * -0.5);
    }
  }

  &.tooltip-modal-right {
    padding-left: var(--padding);

    .tooltip-modal__inner::after {
      top: 50%;

      --square-translate-y: -50%;
      left: calc(var(--padding) * -0.5);
    }
  }
}
</style>
