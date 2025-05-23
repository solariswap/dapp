type Currency = {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
};

type StoreState = {
  currency0?: Currency;
  currency1?: Currency;
};

export const usePoolCreationStore = defineStore("poolCreationStore", () => {
  const state = ref<StoreState>();

  return { state };
});
