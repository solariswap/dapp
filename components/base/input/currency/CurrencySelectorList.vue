<script setup lang="ts">
import type { TokenCurrency } from "~/utils/type/base.type";
import Currency from "~/components/pool/Currency.vue";
import { ethers } from "ethers";
import { useWeb3 } from "~/composables/web3/use-web3.composable";
import ERC20 from "~/utils/abi/ERC20.json";

const props = defineProps<{
  currencies: TokenCurrency[];
  searchInput?: string;
}>();

const emit = defineEmits<{
  (e: "select", currency: TokenCurrency): void;
}>();

const customCurrency = ref<TokenCurrency | null>(null);

const web3 = useWeb3();

// const customCurrency = computed((): TokenCurrency | null => {
//   if (!props.searchInput) return null;
//
//   return {
//     address: props.searchInput,
//     decimals: 18,
//     name: "10",
//     symbol: "ABC",
//   };
// });

const queryIsAddress = computed(() => {
  if (!props.searchInput) return false;

  return ethers.utils.isAddress(props.searchInput);
});

const isCustom = computed(
  () => queryIsAddress.value && !props.currencies.length,
);

watchDebounced(
  () => props.searchInput,
  async (after) => {
    if (isCustom.value && after) {
      const contract = new ethers.Contract(after, ERC20.abi, web3.provider);

      try {
        const [name, symbol, decimals] = await Promise.all([
          contract.name(),
          contract.symbol(),
          contract.decimals(),
        ]);

        customCurrency.value = {
          address: after,
          decimals,
          name,
          symbol,
        };
      } catch (e) {
        console.log(e);
        // Token isn't found or not ERC20 compatible
      }
    }
  },
);
</script>

<template>
  <div class="flex flex-col gap-xs">
    <div class="flex items-center justify-between gap-sm text-xs px-xs">
      <p>Token</p>
      <p>Address</p>
    </div>
    <div class="overflow-y-auto flex-1">
      <button
        v-for="currency in currencies"
        :key="`cs-${currency.name}`"
        type="button"
        class="w-full py-xs px-xs hover:bg-accent"
        @click="emit('select', currency)"
      >
        <Currency
          :symbol="currency.symbol"
          :name="currency.name"
          :logo="currency.logoURI"
          :address="currency.address"
        />
      </button>
      <button
        v-if="isCustom && customCurrency"
        type="button"
        class="w-full py-xs px-xs hover:bg-accent"
        @click="emit('select', customCurrency)"
      >
        <Currency
          :symbol="customCurrency.symbol"
          :name="customCurrency.name"
          :logo="customCurrency.logoURI"
          :address="customCurrency.address"
        />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
