<script setup lang="ts">
import NavigationBar from "~/components/layout/NavigationBar.vue";
import { useModalStore } from "~/store/layout/modal.store";

const modalStore = useModalStore();
</script>

<template>
  <main>
    <NavigationBar />
    <div
      id="app"
      class="min-h-screen mt-(--nav-height) py-xl max-w-desktop mx-auto px-md desktop:px-0"
    >
      <slot />
    </div>

    <teleport to="body">
      <component v-if="modalStore.component" :is="modalStore.component" />
    </teleport>
  </main>
</template>

<style scoped></style>
