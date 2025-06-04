<script setup lang="ts">
import { useModalStore } from "~/store/layout/modal.store";

withDefaults(
  defineProps<{
    maxWidth?: number;
  }>(),
  {
    maxWidth: 550,
  },
);

const opened = ref(false);

const modalStore = useModalStore();

const close = () => {
  modalStore.close();
};

const state = computed(() => {
  return opened.value ? "open" : "closed";
});

onMounted(() => {
  setTimeout(() => {
    opened.value = true;
  }, 50);
});
</script>

<template>
  <div
    class="fixed inset-0 flex place-items-end laptop:place-items-center z-[999] laptop:p-md bg-gray-900/50 appear"
    role="alertdialog"
    @click.exact="close"
    :data-state="state"
  >
    <div
      :data-state="state"
      @click.stop
      class="shadow-xl rounded-t-lg laptop:rounded-lg border border-border bg-card w-full mx-auto modal-container laptop:max-h-auto laptop:min-h-auto flex flex-col overflow-hidden"
      :style="{ maxWidth: `${maxWidth}px` }"
    >
      <div class="p-md flex flex-col h-full">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-container {
  transition:
    opacity 0.2s ease-in-out,
    transform 0.2s ease-in-out;

  &[data-state="closed"] {
    opacity: 0;
    transform: scale(0.95);
  }

  &[data-state="open"] {
    opacity: 1;
    transform: scale(1);
  }

  @media screen and (max-width: 1024px) {
    &[data-state="closed"] {
      opacity: 0;
      transform: translateY(100%);
    }

    &[data-state="open"] {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

@media screen and (max-width: 1024px) {
  .modal-container {
    min-height: 70vh;
    max-height: 90vh;

    &[data-state="closed"] {
      opacity: 0;
      transform: translateY(100%);
    }

    &[data-state="open"] {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.appear {
  opacity: 0;

  transition: opacity 0.2s ease-in-out;

  &[data-state="open"] {
    opacity: 1;
  }
}
</style>
