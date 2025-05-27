<script setup lang="ts">
import Logo from "~/components/base/Logo.vue";
</script>

<template>
  <div class="py-14 laptop:py-md bg-background border-border border-t">
    <div class="max-w-desktop mx-auto px-md">
      <div class="grid laptop:grid-cols-4 gap-md">
        <div class="flex flex-col gap-xs">
          <Logo />
          <p class="text-muted-foreground">
            The next-generation decentralized exchange built on cutting-edge
            technology. Swap tokens instantly with minimal fees and maximum
            security.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
