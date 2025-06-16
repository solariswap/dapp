<script setup lang="ts">
import NavigationBar from "~/components/layout/NavigationBar.vue";
import { useModalStore } from "~/store/layout/modal.store";
import FooterBar from "~/components/layout/FooterBar.vue";

const modalStore = useModalStore();
const colorMode = useColorMode();

colorMode.preference = "dark";

watch(
  () => modalStore.opened,
  (after) => {
    document
      .querySelector("body")
      ?.setAttribute("data-popup-opened", String(after));
  },
);
</script>

<template>
  <main>
    <NavigationBar />
    <div
      id="app"
      class="min-h-[90svh] pt-(--nav-height-margin) pb-(--nav-height) max-w-desktop mx-auto px-md desktop:px-0 flex flex-col h-full"
    >
      <slot />
    </div>
    <FooterBar />

    <teleport to="body">
      <component v-if="modalStore.component" :is="modalStore.component" />
    </teleport>
  </main>
</template>

<style scoped lang="scss">
main {
  background-image: radial-gradient(rgb(60, 59, 56) 1px, transparent 0);
  background-size: 40px 40px;
  background-position: -19px -19px;
}
</style>
