<script setup lang="ts">
import Card from "~/components/layout/Card.vue";
import SquareButton from "~/components/base/input/SquareButton.vue";
import TokenAmountInput from "~/components/base/input/TokenAmountInput.vue";
import type { TokenAmountModel } from "~/utils/type/base.type";
import { currencies } from "~/utils/constant/currency.constant";
import Button from "~/components/base/input/Button.vue";

const model0 = ref<TokenAmountModel>({
  currency: currencies[0],
});

const model1 = ref<TokenAmountModel>({
  currency: currencies[1],
});
</script>

<template>
  <Card class="max-w-[28rem] w-full">
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2 justify-between text-lg font-medium">
        <p>Swap</p>
        <SquareButton><Icon name="lucide:settings" /></SquareButton>
      </div>
      <TokenAmountInput v-model="model0">From</TokenAmountInput>
      <div class="flex items-center justify-center -my-6 relative">
        <div
          class="rounded-full aspect-square w-10 gap-2 grid place-items-center bg-gradient-to-r from-yellow-500 to-orange-500"
        >
          <Icon name="lucide:arrow-down" />
        </div>
      </div>
      <TokenAmountInput v-model="model1">To</TokenAmountInput>
      <div
        class="rounded p-sm bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 border border-purple-500/20"
      >
        <div class="flex flex-col gap-1 font-medium text-sm">
          <div class="flex items-center justify-between gap-2">
            <p class="text-muted-foreground">Price</p>
            <p class="text-purple-400">
              1 {{ model0.currency.symbol }} = 0.543
              {{ model1.currency.symbol }}
            </p>
          </div>
          <div class="flex items-center justify-between gap-2">
            <p class="text-muted-foreground">Slippage tolerance</p>
            <p class="text-purple-400">0.5%</p>
          </div>
        </div>
      </div>
      <Button>Swap</Button>
    </div>
  </Card>
</template>

<style scoped></style>
