import type { TokenAmountModel, TokenCurrency } from "~/utils/type/base.type";
import { currencies } from "~/utils/constant/currency.constant";

type StoreState = {
  model0: TokenAmountModel;
  model1: TokenAmountModel;

  slippageTolerance: number;
  deadline: number;
};

export const useSwapperStore = defineStore("swapperStore", () => {
  const state = ref<StoreState>({
    model0: {
      currency: currencies[0],
    },
    model1: {
      currency: currencies[1],
    },
    slippageTolerance: 0.005,
    deadline: 20,
  });

  const slippageTolerance = computed(() => {
    return (state.value.slippageTolerance * 100).toFixed(2) + "%";
  });

  return {
    state,

    slippageTolerance,
  };
});
