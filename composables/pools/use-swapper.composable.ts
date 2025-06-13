import { useQuoter } from "~/composables/pools/use-quoter.composable";
import { useUniswapRouter } from "~/composables/pools/use-uniswap-router.composable";
import type { usePool } from "~/composables/pools/use-pool.composable";

export const useSwapperFactory = () => {
  const quoter = useQuoter();
  const router = useUniswapRouter();

  const construct = (pool: ReturnType<typeof usePool>) => {
    const quoteExactInputSingle = async (
      amountIn: number,
      tokenIn: string,
      tokenOut: string,
    ) => {
      const [fee] = await Promise.all([pool.getFee()]);

      return await quoter.quoteExactInputSingle({
        tokenIn,
        tokenOut,
        fee,
        amountIn,
        tokenInDecimals: 18,
      });
    };

    const quoteExactOutputSingle = async (
      amountOut: number,
      tokenIn: string,
      tokenOut: string,
    ) => {
      const [fee] = await Promise.all([pool.getFee()]);

      return await quoter.quoteExactOutputSingle({
        tokenIn,
        tokenOut,
        fee,
        amountOut,
        decimalsTokenOut: 18,
      });
    };

    return { quoteExactInputSingle, quoteExactOutputSingle };
  };

  return { construct };
};
