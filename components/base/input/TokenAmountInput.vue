<script setup lang="ts">
import type { TokenAmountModel } from "~/utils/type/base.type";
import SmallCurrencySelector from "~/components/base/input/currency/SmallCurrencySelector.vue";
import { useProvider } from "~/composables/web3/use-provider.composable";
import { BigNumber, ethers } from "ethers";
import ERC20 from "~/utils/abi/ERC20.json";
import { useAppKitAccount } from "@reown/appkit/vue";

const model = defineModel<TokenAmountModel>({ required: true });
const account = useAppKitAccount();

const balance = ref<number>();
const provider = useProvider();

const balanceVisible = computed(() => !!model.value.currency);
const balanceLabel = computed(() => {
  if (!balance.value) return `Balance: 0 ${model.value.currency.symbol}`;

  return `Balance: ${Number(balance.value).toFixed(2)} ${model.value.currency.symbol}`;
});

watchDebounced(
  model,
  async (after, before) => {
    const _provider = provider.getProvider();
    const address = account.value.address;
    if (!_provider || !address) return;
    // if (after?.currency?.symbol === before?.currency?.symbol) return;

    console.log(after.currency);
    const contract = new ethers.Contract(
      after.currency.address,
      ERC20.abi,
      _provider,
    );

    try {
      const amount = BigNumber.from(await contract.balanceOf(address));
      balance.value = Number(ethers.utils.formatEther(amount.toBigInt()));
    } catch (e) {}
    // balance.value =
    // todo: check balance
  },
  { deep: true },
);
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
