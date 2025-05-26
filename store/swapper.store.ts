import type { TokenCurrency } from "~/utils/type/base.type";

type StoreState = {
  currency0?: TokenCurrency;
  currency1?: TokenCurrency;

  amount0: number;
  amount1: number;
};

export const useSwapperStore = defineStore("swapperStore", () => {
  const state = ref<StoreState>({
    amount0: 0,
    amount1: 0,
  });

  return {
    state,
  };
});
