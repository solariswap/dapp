import type { TokenCurrency } from "~/utils/type/base.type";

type StoreState = {
  step: number;
  currency0?: TokenCurrency;
  currency1?: TokenCurrency;
  poolFee?: number;
  initialPrice: number;
  basePrice: "base_price" | "quote_price";
  liquidityType: "full" | "concentrated";
  priceRange: [number, number];
  currency0Amount: number;
  currency1Amount: number;
};

export const usePoolCreationStore = defineStore("poolCreationStore", () => {
  const state = ref<StoreState>({
    step: 0,
    initialPrice: 1,
    basePrice: "base_price",
    liquidityType: "full",
    priceRange: [0, 0],
    currency0Amount: 0,
    currency1Amount: 0,
  });

  const nextStep = () => {
    state.value.step++;
  };

  const initMarketPrice = (price: number) => {
    state.value.initialPrice = price;

    const percent = 0.2;
    state.value.priceRange = [price * (1 - percent), price * (1 + percent)];
  };

  const poolName = computed(() => {
    return `${state.value.currency0?.symbol} / ${state.value.currency1?.symbol}`;
  });

  const priceLabel = computed(() => {
    const symbol0 = state.value.currency0?.symbol;
    const symbol1 = state.value.currency1?.symbol;

    const way = state.value.basePrice === "base_price" ? 1 : 0;

    return `${way ? symbol0 : symbol1} per ${way ? symbol1 : symbol0}`;
  });

  const errors = computed(() => {
    const errors: string[] = [];
    const price = state.value.initialPrice;

    if (state.value.liquidityType === "concentrated") {
      if (state.value.priceRange[0] > state.value.priceRange[1])
        errors.push("Minimum price must be less than maximum price");
    }

    if (price <= 0) errors.push("Initial price must be greater than 0");

    return errors;
  });

  const symbol0 = computed(() => {
    return state.value.currency0?.symbol;
  });

  const symbol1 = computed(() => {
    return state.value.currency1?.symbol;
  });

  const priceRange = computed(() => {
    if (state.value.liquidityType === "full") return "Full range";

    return `${state.value.priceRange[0].toPrecision(6)} - ${state.value.priceRange[1].toPrecision(6)} ${priceLabel.value}`;
  });

  return {
    state,
    nextStep,
    poolName,
    priceLabel,
    initMarketPrice,
    errors,
    symbol0,
    symbol1,
    priceRange,
  };
});
