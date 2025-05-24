import type { TokenCurrency } from "~/utils/type/base.type";

type StoreState = {
  step: number;
  currency0?: TokenCurrency;
  currency1?: TokenCurrency;
  poolFee?: number;
};

export const usePoolCreationStore = defineStore("poolCreationStore", () => {
  const state = ref<StoreState>({
    step: 0,
  });

  const nextStep = () => {
    state.value.step++;
  };

  const poolName = computed(() => {
    return `${state.value.currency0?.symbol} / ${state.value.currency1?.symbol}`;
  });

  return { state, nextStep, poolName };
});
