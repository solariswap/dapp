<script setup lang="ts">
import Card from "~/components/layout/Card.vue";
import SquareButton from "~/components/base/input/SquareButton.vue";
import Button from "~/components/base/input/Button.vue";
import { useSwapperStore } from "~/store/swapper.store";

const store = useSwapperStore();
</script>

<template>
  <Card class="max-w-[28rem] w-full">
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2 justify-between text-lg font-medium">
        <p>Swap</p>
        <SquareButton>
          <Icon name="lucide:settings" />
        </SquareButton>
      </div>
      <USkeleton class="w-full h-[88px]"></USkeleton>
      <div class="flex items-center justify-center -my-6 relative z-10">
        <div
          class="rounded-full aspect-square w-10 gap-2 grid place-items-center bg-gradient-to-r from-yellow-500 to-orange-500"
        >
          <Icon name="lucide:arrow-down" />
        </div>
      </div>
      <USkeleton class="w-full h-[88px]"></USkeleton>
      <SwapSummary />
      <Button disabled :loading="store.state.loading"> Swap </Button>
    </div>
  </Card>
</template>

<style scoped></style>
