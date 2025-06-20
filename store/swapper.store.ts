import type { TokenAmountModel, TokenCurrency } from "~/utils/type/base.type";
import { currencies } from "~/utils/constant/currency.constant";

type StoreState = {
  model0: TokenAmountModel;
  model1: TokenAmountModel;

  model0Loading: boolean;
  model1Loading: boolean;

  pricePerToken0: number;
  poolFee?: number;
  poolTokens?: [string, string];

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

  const areTokenReversed = (tokens: [string, string]) => {
    if (!state.value.poolTokens) return false;

    return (
      tokens[0] === state.value.poolTokens[1] &&
      tokens[1] === state.value.poolTokens[0]
    );
  };

  const setMode = (mode: "quoteIn" | "quoteOut") => {
    state.value.mode = mode;
  };

  return {
    state,

    slippageTolerance,
    areTokenReversed,
    setMode,
  };
});
