import { useProvider } from "~/composables/web3/use-provider.composable";
import { BigNumber, ethers } from "ethers";
import Quoter from "@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json";
import { fromReadableAmount } from "~/utils/function/token.function";
import type {
  QuoteExactInputSingleParams,
  QuoteExactInputSingleResponse,
  QuoteExactOutputSingleParams,
  QuoteExactOutputSingleResponse,
} from "~/utils/type/composable/quoter-composable.type";

export const useQuoter = () => {
  const provider = useProvider();
  const runtimeConfig = useRuntimeConfig();

  const getQuoter = () => {
    return new ethers.Contract(
      runtimeConfig.public.quoterAddress,
      Quoter.abi,
      provider.getProvider()!,
    );
  };

  const quoteExactInputSingle = async (
    params: QuoteExactInputSingleParams,
  ): Promise<QuoteExactInputSingleResponse | null> => {
    const quoter = getQuoter();

    try {
      const response = await quoter.callStatic.quoteExactInputSingle({
        tokenIn: params.tokenIn,
        tokenOut: params.tokenOut,
        fee: params.fee,
        amountIn: fromReadableAmount(
          params.amountIn.toString(),
          params.tokenInDecimals,
        ).toString(),
        sqrtPriceLimitX96: params.sqrtPriceLimitX96 ?? 0,
      });

      return {
        amountOut: BigNumber.from(response[0]),
        sqrtPriceX96After: BigNumber.from(response[1]),
        initializedTicksCrossed: parseFloat(response[2]),
        gasEstimate: BigNumber.from(response[3]),
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const quoteExactOutputSingle = async (
    params: QuoteExactOutputSingleParams,
  ): Promise<QuoteExactOutputSingleResponse | null> => {
    const quoter = getQuoter();

    try {
      const response = await quoter.callStatic.quoteExactOutputSingle({
        tokenIn: params.tokenIn,
        tokenOut: params.tokenOut,
        fee: params.fee,
        amount: BigNumber.from(
          fromReadableAmount(
            params.amountOut.toString(),
            params.decimalsTokenOut,
          ),
        ),
        sqrtPriceLimitX96: params.sqrtPriceLimitX96 ?? 0,
      });

      return {
        amountIn: BigNumber.from(response[0]),
        sqrtPriceX96After: BigNumber.from(response[1]),
        initializedTicksCrossed: parseFloat(response[2]),
        gasEstimate: BigNumber.from(response[3]),
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return { quoteExactInputSingle, quoteExactOutputSingle };
};
