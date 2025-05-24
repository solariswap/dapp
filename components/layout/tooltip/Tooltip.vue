<script setup lang="ts">
import TooltipModal from "./TooltipModal.vue";
import {
  ref,
  computed,
  useSlots,
  watch,
  onMounted,
  onBeforeUnmount,
} from "vue";

type Position = "top" | "bottom" | "left" | "right";

/*
 * The goal of the Tooltip component is to provide a simple way to add an absolute
 * positioned tooltip to any element. The tooltip will be displayed when the user
 * hovers over the element.
 *
 * The tooltip will be displayed above the element by default, but if there is not
 * enough space above the element, it will be displayed below the element.
 */

const props = withDefaults(
  defineProps<{
    /**
     * The tag that will be used to render the tooltip. This can be any valid HTML tag.
     * The default value is 'div'.
     */
    tag?: string;
    /**
     * The class that will be applied to the icon. This can be any valid CSS class.
     * The default value is 'w-[1em]'.
     */
    defaultIconClass?: string;
    /**
     * The modal max width. Is in pixels.
     *
     * The default value is 200.
     */
    modalMaxWidth?: number;
    /**
     * The position of the tooltip. This can be 'top', 'bottom', 'left', or 'right'.
     * Can be overridden by the calculateTooltipPosition method.
     *
     * The default value is 'top'.
     */
    position?: Position;
    /**
     * The margin on the Y axis. Is in pixels.
     *
     * The default value is 10.
     */
    marginX?: number;
    /**
     * The margin on the X axis. Is in pixels.
     *
     * The default value is 200.
     */
    marginY?: number;
    /**
     * If true, the border will be dashed.
     *
     * The default value is false.
     */
    dashed?: boolean;
  }>(),
  {
    tag: "span",
    defaultIconClass: "w-[1em]",
    modalMaxWidth: 200,
    position: "top",
    marginX: 10,
    marginY: 200,
    dashed: true,
  },
);

const slots = useSlots();

const hovered = ref(false);
const $wrapper = ref<HTMLElement>();
const maxWidth = ref(props.modalMaxWidth);
const tooltipPosition = ref<Position>(props.position);
const offsetX = ref(0);

const onMouseEnter = () => {
  hovered.value = true;
};
const onMouseLeave = () => {
  hovered.value = false;
};
const onFocusIn = () => {
  hovered.value = true;
};
const onFocusOut = () => {
  hovered.value = false;
};

const calculateTooltipPosition = () => {
  if (!$wrapper.value) return;

  const rect = $wrapper.value.getBoundingClientRect();

  if (window.innerWidth - props.marginX * 2 < props.modalMaxWidth) {
    maxWidth.value = window.innerWidth - props.marginX * 2;
  } else {
    maxWidth.value = props.modalMaxWidth;
  }

  const xCenter = rect.right - rect.width / 2;
  const spaceAbove = rect.top;
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceLeft = xCenter;
  const spaceRight = window.innerWidth - xCenter;
  const width = maxWidth.value;

  let position = props.position;

  const leftRightHasYSpace =
    spaceAbove >= props.marginY / 2 && spaceBelow >= props.marginY / 2;
  const hasSpaceLeft = spaceLeft >= props.marginX && leftRightHasYSpace;
  const hasSpaceRight = spaceRight >= props.marginX && leftRightHasYSpace;
  const hasSpaceAbove = spaceAbove >= props.marginY;
  const hasSpaceBelow = spaceBelow >= props.marginY;

  if (position === "top" && !hasSpaceAbove) {
    position = "bottom";
  } else if (position === "bottom" && !hasSpaceBelow) {
    position = "top";
  } else if (position === "left" && !hasSpaceLeft) {
    if (hasSpaceBelow) {
      position = "bottom";
    } else if (hasSpaceAbove) {
      position = "top";
    }
  } else if (position === "right" && !hasSpaceRight) {
    if (hasSpaceBelow) {
      position = "bottom";
    } else if (hasSpaceAbove) {
      position = "top";
    }
  }

  if (["bottom", "top"].includes(position)) {
    // Does the tooltip overflows?
    const rightOffset = xCenter + width / 2;
    const leftOffset = xCenter - width / 2;

    const overflows = rightOffset > window.innerWidth || leftOffset < 0;

    if (overflows) {
      if (rightOffset > window.innerWidth) {
        offsetX.value = window.innerWidth - rightOffset - props.marginX;
      } else if (leftOffset < 0) {
        offsetX.value = -leftOffset + props.marginX;
      }
    } else {
      offsetX.value = 0;
    }
  }

  tooltipPosition.value = position;
};

const tooltipDisplayed = computed(() => {
  return hovered.value;
});
const tooltipModalClass = computed(() => {
  return {
    "tooltip-modal__top": tooltipPosition.value === "top",
    "tooltip-modal__bottom": tooltipPosition.value === "bottom",
    "tooltip-modal__left": tooltipPosition.value === "left",
    "tooltip-modal__right": tooltipPosition.value === "right",
  };
});
const tooltipModalStyle = computed(() => {
  return {
    maxWidth: `${maxWidth.value}px`,
  };
});
const buttonClass = computed(() => {
  return {
    "border-b": !!slots["default"] && props.dashed,
    "mb-0.5": !!slots["default"] && props.dashed,
    "border-dashed": props.dashed,
    "border-current": props.dashed,
  };
});

watch(tooltipDisplayed, (value) => {
  if (value) {
    calculateTooltipPosition();
  }
});

onMounted(() => {
  window.addEventListener("resize", calculateTooltipPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateTooltipPosition);
});
</script>

<template>
  <component
    :is="tag"
    ref="$wrapper"
    class="tooltip-wrapper"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <button
      tabindex="-1"
      type="button"
      :class="buttonClass"
      @focusin="onFocusIn"
      @focusout="onFocusOut"
    >
      <slot name="default">
        <Icon
          name="material-symbols:help"
          class="help-circle"
          :class="defaultIconClass"
        />
      </slot>
    </button>
    <Transition>
      <TooltipModal
        v-if="tooltipDisplayed"
        class="tooltip-modal"
        :class="tooltipModalClass"
        :style="tooltipModalStyle"
        :position="tooltipPosition"
        :max-width="maxWidth"
        :offset-x="offsetX"
      >
        <slot name="tooltip" />
      </TooltipModal>
    </Transition>
  </component>
</template>

<style scoped lang="scss">
.tooltip-wrapper {
  position: relative;

  button {
    vertical-align: middle;
    cursor: help;

    outline-style: none;

    &:focus-visible {
      @apply ring-4 ring-offset-0 ring-ring rounded-full;
    }
  }

  .help-circle {
    aspect-ratio: 1/1;
  }

  .tooltip-modal {
    position: absolute;

    &__top {
      bottom: 100%;
      left: 50%;
    }

    &__bottom {
      top: 100%;
      left: 50%;
    }

    &__left {
      right: 100%;
      top: 50%;
    }

    &__right {
      left: 100%;
      top: 50%;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 200ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
