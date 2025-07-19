<script setup lang="ts">
import type { TokenAmountModel } from "~/utils/type/base.type";
import SmallCurrencySelector from "~/components/base/input/currency/SmallCurrencySelector.vue";
import { useProvider } from "~/composables/web3/use-provider.composable";
import { BigNumber, ethers } from "ethers";
import ERC20 from "~/utils/abi/ERC20.json";
import { useAppKitAccount } from "@reown/appkit/vue";
import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";

const props = withDefaults(defineProps<{ loading?: boolean }>(), {
  loading: false,
});
const emit = defineEmits<{
  (e: "update-amount", amount?: number): void;
  (e: "update-currency", currency: Hrc20Entity): void;
}>();

const model = defineModel<TokenAmountModel>({ required: true });
const account = useAppKitAccount();

const balance = ref<number>();
const rawInput = ref("");
const provider = useProvider();
const inputRef = ref<HTMLInputElement>();

const balanceVisible = computed(() => !!model.value.currency);
const balanceLabel = computed(() => {
  if (!balance.value) return `Balance: 0 ${model.value.currency.symbol}`;

  return `Balance: ${Number(balance.value).toFixed(4)} ${model.value.currency.symbol}`;
});

const onUpdate = async (erc20Address: string) => {
  const _provider = provider.getProvider();
  const address = account.value.address;
  if (!_provider || !address) return;

  const contract = new ethers.Contract(erc20Address, ERC20.abi, _provider);

  try {
    const amount = BigNumber.from(await contract.balanceOf(address));
    balance.value = Number(ethers.utils.formatEther(amount.toBigInt()));
  } catch (e) {}
};

watchDebounced(
  () => model.value.currency,
  async (after, before) => {
    if (after.address !== before.address) {
      emit("update-currency", before);
      await onUpdate(after.address);
    }
  },
  { deep: true },
);

watch(
  () => account.value.isConnected,
  async (after, before) => {
    if (!before && after) await onUpdate(model.value.currency.address);
  },
);

onMounted(async () => {
  await onUpdate(model.value.currency.address);
});

const updateAmount = useDebounceFn(async () => {
  emit("update-amount", model.value.amount);
}, 200);

const cls = computed(() => {
  return {
    "animate-pulse": props.loading,
  };
});

watch(
  () => model.value.amount,
  (val) => {
    if (document.activeElement !== inputRef.value) {
      rawInput.value =
        val !== undefined && val !== null
          ? val.toFixed(model.value.currency.decimals).replace(/\.?0+$/, "") // show decimal, no trailing 0s
          : "";
    }
  },
  { immediate: true },
);

const onInputAmount = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  rawInput.value = val;

  const parsed = parseFloat(val.replace(",", "."));
  if (!isNaN(parsed)) {
    model.value.amount = parsed;
    updateAmount(); // debounced emit
  } else {
    model.value.amount = undefined;
  }
};
</script>

<template>
  <div class="rounded-xl p-4 bg-muted" :class="cls">
    <div
      class="flex items-center gap-2 justify-between mb-2 text-sm text-muted-foreground"
    >
      <p><slot /></p>
      <p v-if="balanceVisible">{{ balanceLabel }}</p>
    </div>
    <div class="flex items-center gap-2">
      <input
        v-if="!loading"
        ref="inputRef"
        @input="onInputAmount"
        type="text"
        inputmode="decimal"
        :value="rawInput"
        placeholder="0,0"
        class="outline-none w-full placeholder:text-muted-foreground text-xl"
      />
      <p v-else class="text-xl text-muted-foreground w-full">Loading...</p>
      <SmallCurrencySelector v-model="model.currency" class="shrink-0" />
    </div>
  </div>
</template>

<style scoped></style>
