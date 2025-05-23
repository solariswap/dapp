import type { TokenCurrency } from "~/utils/type/base.type";

type StoreState = {
  currency0?: TokenCurrency;
  currency1?: TokenCurrency;
};

export const usePoolCreationStore = defineStore("poolCreationStore", () => {
  const state = ref<StoreState>({});

  return { state };
});
