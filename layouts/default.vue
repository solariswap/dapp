<script setup lang="ts">
import NavigationBar from "~/components/layout/NavigationBar.vue";
</script>

<template>
  <main>
    <NavigationBar />
    <div
      id="app"
      class="min-h-screen mt-[var(--nav-height)] py-xl max-w-desktop mx-auto px-md desktop:px-0"
    >
      <slot />
    </div>
  </main>
</template>

<style scoped></style>
