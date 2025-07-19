<script setup lang="ts">
import type { TokenAmountModel } from "~/utils/type/base.type";
import SmallCurrencySelector from "~/components/base/input/currency/SmallCurrencySelector.vue";
import { useProvider } from "~/composables/web3/use-provider.composable";
import { BigNumber, ethers } from "ethers";
import ERC20 from "~/utils/abi/ERC20.json";
import { useAppKitAccount } from "@reown/appkit/vue";
import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";
import { formatTokenDecimals } from "~/utils/function/currency.function";

const props = withDefaults(defineProps<{ loading?: boolean }>(), {
  loading: false,
});
const emit = defineEmits<{
  (e: "update-amount", amount?: number): void;
  (e: "update-currency", currency: Hrc20Entity): void;
}>();

const model = defineModel<TokenAmountModel>({ required: true });
const account = useAppKitAccount();

const error = ref<boolean>(false);
const balance = ref<BigNumber>();
const rawInput = ref("");
const provider = useProvider();
const inputRef = ref<HTMLInputElement>();

const balanceVisible = computed(() => !!model.value.currency);
const balanceLabel = computed(() => {
  const formatted = formatTokenDecimals(
    balance.value ?? 0,
    model.value.currency,
    {
      maxDecimals: 4,
    },
  );
  return `Balance: ${formatted}`;
});

const onUpdate = async (erc20Address: string) => {
  const _provider = provider.getProvider();
  const address = account.value.address;
  if (!_provider || !address) return;

  const contract = new ethers.Contract(erc20Address, ERC20.abi, _provider);

  try {
    balance.value = BigNumber.from(await contract.balanceOf(address));
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
    "!border-red-500": error.value,
  };
});

const checkBalance = () => {
  if (!model.value.amount || !balance.value) return;

  const amount = parseFloat(ethers.utils.formatEther(balance.value));
  error.value = model.value.amount > amount;
};

watch(
  () => model.value.amount,
  (val) => {
    checkBalance();
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
    // Check if the input is greater than the balance
    updateAmount(); // debounced emit
  } else {
    model.value.amount = undefined;
  }
};

const max = () => {
  if (!model.value.currency || !balance.value) return;

  const amount = parseFloat(ethers.utils.formatEther(balance.value));
  model.value.amount = amount;
  rawInput.value = amount
    .toFixed(model.value.currency.decimals)
    .replace(/\.?0+$/, "");
  updateAmount();
};
</script>

<template>
  <div class="rounded-xl p-4 bg-muted border border-transparent" :class="cls">
    <div class="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
      <p class="flex-1"><slot /></p>
      <p v-if="balanceVisible">{{ balanceLabel }}</p>
      <button @click="max" class="font-bold cursor-pointer">MAX</button>
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
