import { useProvider } from "~/composables/web3/use-provider.composable";
import { BigNumber, ethers } from "ethers";
import Router from "@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json";
import type {
  ExactInputSingleParams,
  ExactInputSingleResponse,
  ExactOutputSingleParams,
  ExactOutputSingleResponse,
} from "~/utils/type/composable/router-composable.type";
import { fromReadableAmount } from "~/utils/function/token.function";

export const useUniswapRouter = () => {
  const provider = useProvider();
  const runtimeConfig = useRuntimeConfig();

  const getRouter = () => {
    return new ethers.Contract(
      runtimeConfig.public.routerAddress,
      Router.abi,
      provider.getSigner()!,
    );
  };

  const exactInputSingle = async (
    params: ExactInputSingleParams,
  ): Promise<ExactInputSingleResponse> => {
    const router = getRouter();

    const tx = await router.exactInputSingle({
      tokenIn: params.tokenIn,
      tokenOut: params.tokenOut,
      fee: params.fee,
      recipient: params.recipient,
      deadline: params.deadline,
      amountIn: BigNumber.from(
        fromReadableAmount(params.amountIn.toString(), params.tokenInDecimals),
      ),
      amountOutMinimum: BigNumber.from(
        fromReadableAmount(
          params.amountOutMinimum.toString(),
          params.tokenOutDecimals,
        ),
      ),
      sqrtPriceLimitX96: params.sqrtPriceLimitX96 ?? 0,
    });

    await tx.wait();

    return {
      hash: tx.hash,
    };
  };

  const exactOutputSingle = async (
    params: ExactOutputSingleParams,
  ): Promise<ExactOutputSingleResponse> => {
    const router = getRouter();

    const tx = await router.exactOutputSingle({
      tokenIn: params.tokenIn,
      tokenOut: params.tokenOut,
      fee: params.fee,
      recipient: params.recipient,
      deadline: params.deadline,
      amountOut: BigNumber.from(
        fromReadableAmount(
          params.amountOut.toString(),
          params.tokenOutDecimals,
        ),
      ),
      amountInMaximum: BigNumber.from(
        fromReadableAmount(
          params.amountInMaximum.toString(),
          params.tokenInDecimals,
        ),
      ),
      sqrtPriceLimitX96: params.sqrtPriceLimitX96 ?? 0,
    });

    await tx.wait();

    return {
      hash: tx.hash,
    };
  };

  return { exactInputSingle, exactOutputSingle };
};
