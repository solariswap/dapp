<script setup lang="ts">
import type { TokenAmountModel } from "~/utils/type/base.type";
import SmallCurrencySelector from "~/components/base/input/currency/SmallCurrencySelector.vue";

const model = defineModel<TokenAmountModel>({ required: true });

const balance = ref<bigint>();

const balanceVisible = computed(() => !!model.value.currency);
const balanceLabel = computed(() => {
  if (!balance.value) return `Balance: 0 ${model.value.currency.symbol}`;

  return `Balance: ${Number(balance.value).toFixed(2)} ${model.value.currency.symbol}`;
});

watch(model, (after, before) => {
  if (after?.currency === before?.currency) return;

  // todo: check balance
});
</script>

<template>
  <div class="rounded-xl bg-muted p-4">
    <div
      class="flex items-center gap-2 justify-between mb-2 text-sm text-muted-foreground"
    >
      <p><slot /></p>
      <p v-if="balanceVisible">{{ balanceLabel }}</p>
    </div>
    <div class="flex items-center gap-2">
      <input
        type="number"
        v-model="model.amount"
        placeholder="0,0"
        class="outline-none w-full placeholder:text-muted-foreground text-xl"
      />
      <SmallCurrencySelector v-model="model.currency" class="shrink-0" />
    </div>
  </div>
</template>

<style scoped></style>
