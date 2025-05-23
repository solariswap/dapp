<script setup lang="ts">
import Button from "~/components/base/input/Button.vue";

const expanded = ref(false);

const toggleIconName = computed(() =>
  expanded.value ? "mdi:times" : "uil:bars",
);

const linksClass = computed(() => {
  return expanded.value
    ? "mt-[1px] absolute !flex top-full flex-col inset-x-0 py-md px-md bg-background border-b border-border"
    : "";
});

const routes = [
  { name: "Swap", path: "/" },
  { name: "Pools", path: "/pools" },
];
</script>

<template>
  <nav
    class="py-sm laptop:py-md border-b border-border fixed top-0 inset-x-0 bg-background z-50"
  >
    <div
      class="max-w-desktop mx-auto px-md desktop:px-0 flex items-center gap-lg"
    >
      <BaseLogo />
      <div
        class="hidden laptop:flex laptop:items-center gap-md flex-1"
        :class="linksClass"
      >
        <ul class="flex flex-col laptop:flex-row laptop:items-center gap-sm">
          <li
            v-for="route in routes"
            :key="`route-${route.name}`"
            class="text-3xl laptop:text-lg"
          >
            <nuxt-link
              :to="route.path"
              class="nav-item text-foreground/60"
              exact-active-class="!text-foreground"
            >
              {{ route.name }}
            </nuxt-link>
          </li>
        </ul>
        <ul
          class="flex flex-col laptop:flex-row laptop:items-center gap-sm laptop:ml-auto"
        >
          <li>
            <Button class="w-full laptop:w-auto" leading-icon="lucide:wallet">
              Connect Wallet
            </Button>
          </li>
        </ul>
      </div>
      <button
        class="laptop:hidden ml-auto grid place-items-center p-2 pr-0"
        @click="expanded = !expanded"
      >
        <Icon :name="toggleIconName" />
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss"></style>
