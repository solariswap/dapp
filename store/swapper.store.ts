import type { TokenAmountModel } from "~/utils/type/base.type";
import { currencies } from "~/utils/constant/currency.constant";

type StoreState = {
  model0: TokenAmountModel;
  model1: TokenAmountModel;

  model0Loading: boolean;
  model1Loading: boolean;

  pricePerToken0: number;
  poolFee?: number;

  reversed: boolean;

  slippageTolerance: number;
  deadline: number;
  mode: "quoteIn" | "quoteOut";
  loading: boolean;
};

export const useSwapperStore = defineStore("swapperStore", () => {
  const state = ref<StoreState>({
    model0: {
      currency: currencies[0],
    },
    model1: {
      currency: currencies[1],
    },
    reversed: false,
    model0Loading: false,
    model1Loading: false,
    pricePerToken0: 0,
    slippageTolerance: 0.005,
    deadline: 20,
    mode: "quoteIn",
    loading: false,
  });

  const slippageTolerance = computed(() => {
    return (state.value.slippageTolerance * 100).toFixed(2) + "%";
  });

  const setMode = (mode: "quoteIn" | "quoteOut") => {
    state.value.mode = mode;
  };

  return {
    state,

    slippageTolerance,
    setMode,
  };
});
