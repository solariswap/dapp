<script setup lang="ts">
import Currency from "~/components/pool/Currency.vue";
import { ethers } from "ethers";
import { useProvider } from "~/composables/web3/use-provider.composable";
import ERC20 from "~/utils/abi/ERC20.json";
import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";

const props = defineProps<{
  currencies: Hrc20Entity[];
  searchInput?: string;
}>();

const emit = defineEmits<{
  (e: "select", currency: Hrc20Entity): void;
  (e: "load-next"): void;
  (e: "update-search", search: string | undefined): void;
}>();

const customCurrency = ref<Hrc20Entity | null>(null);

const provider = useProvider();

const queryIsAddress = computed(() => {
  if (!props.searchInput) return false;

  return ethers.utils.isAddress(props.searchInput);
});

const isCustom = computed(
  () => queryIsAddress.value && !props.currencies.length,
);

onMounted(() => {
  const scrollElement = document.getElementById("currencies");

  if (scrollElement) {
    scrollElement.addEventListener("scroll", handleScroll);
  }
});

onBeforeUnmount(() => {
  const scrollElement = document.getElementById("currencies");

  if (scrollElement) {
    scrollElement.removeEventListener("scroll", handleScroll);
  }
});

const handleScroll = () => {
  const scrollElement = document.getElementById("currencies");
  if (!scrollElement) return;

  const { scrollTop, scrollHeight, clientHeight } = scrollElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    emit("load-next");
  }
};

watchDebounced(
  () => props.searchInput,
  async (after) => {
    emit("update-search", after);
    if (isCustom.value && after) {
      const contract = new ethers.Contract(
        after,
        ERC20.abi,
        provider.getStaticProvider(),
      );

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
          popular: false,
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
    <div id="currencies" class="overflow-y-auto flex-1">
      <button
        v-for="currency in currencies"
        :key="currency.address"
        type="button"
        class="w-full py-xs px-xs hover:bg-accent"
        @click="emit('select', currency)"
      >
        <Currency
          :symbol="currency.symbol"
          :name="currency.name"
          :logo="currency.logoUri"
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
          :logo="customCurrency.logoUri"
          :address="customCurrency.address"
        />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
