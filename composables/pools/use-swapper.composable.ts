import { useQuoter } from "~/composables/pools/use-quoter.composable";
import { useUniswapRouter } from "~/composables/pools/use-uniswap-router.composable";
import type { usePool } from "~/composables/pools/use-pool.composable";
import type {
  SwapExactInputSingleParams,
  SwapExactOutputSingleParams,
} from "~/utils/type/composable/swapper-composable.type";
import { useAppKitAccount } from "@reown/appkit/vue";

export const useSwapperFactory = () => {
  const quoter = useQuoter();
  const router = useUniswapRouter();
  const account = useAppKitAccount();
  const { $modal } = useNuxtApp();

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

    const swapExactInputSingle = async (params: SwapExactInputSingleParams) => {
      // Require the wallet to be connected
      if (!account.value.isConnected || !account.value.address)
        return $modal.open();

      const [fee] = await Promise.all([pool.getFee()]);

      return await router.exactInputSingle({
        tokenIn: params.tokenIn,
        tokenOut: params.tokenOut,
        fee,
        tokenInDecimals: params.tokenInDecimals,
        tokenOutDecimals: params.tokenOutDecimals,
        deadline: params.deadline,
        recipient: account.value.address,
        amountIn: params.amountIn,
        amountOutMinimum: params.amountOutMinimum,
        sqrtPriceLimitX96: params.sqrtPriceLimitX96,
      });
    };

    const swapExactOutputSingle = async (
      params: SwapExactOutputSingleParams,
    ) => {
      // Require the wallet to be connected
      if (!account.value.isConnected || !account.value.address)
        return $modal.open();

      const [fee] = await Promise.all([pool.getFee()]);

      return await router.exactOutputSingle({
        tokenIn: params.tokenIn,
        tokenOut: params.tokenOut,
        fee,
        tokenInDecimals: params.tokenInDecimals,
        tokenOutDecimals: params.tokenOutDecimals,
        deadline: params.deadline,
        recipient: account.value.address,
        amountOut: params.amountOut,
        amountInMaximum: params.amountInMaximum,
        sqrtPriceLimitX96: params.sqrtPriceLimitX96,
      });
    };

    return {
      quoteExactInputSingle,
      quoteExactOutputSingle,
      swapExactInputSingle,
      swapExactOutputSingle,
    };
  };

  return { construct };
};
