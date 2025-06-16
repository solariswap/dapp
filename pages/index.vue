<script setup lang="ts">
import Swapper from "~/components/swap/Swapper.vue";
import SwapperSkeleton from "~/components/swap/skeleton/SwapperSkeleton.vue";
</script>

<template>
  <div class="flex flex-col flex-1 justify-center items-center">
    <ClientOnly>
      <Swapper />
      <template #fallback>
        <SwapperSkeleton />
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped></style>
