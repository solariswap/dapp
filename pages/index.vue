<script setup lang="ts">
import Swapper from "~/components/swap/Swapper.vue";
import SwapperSkeleton from "~/components/swap/skeleton/SwapperSkeleton.vue";
import TextWordAppear from "~/components/base/animation/TextWordAppear.vue";
</script>

<template>
  <div class="flex flex-col flex-1 justify-center items-center">
    <TextWordAppear
      class="text-3xl laptop:text-5xl laptop:mb-10 mb-8 font-bold justify-center max-w-[28rem]"
      text="Where DeFi moves at light speed EHEH"
    />
    <ClientOnly>
      <Swapper />
      <template #fallback>
        <SwapperSkeleton />
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped></style>
