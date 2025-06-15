import type { BigNumber } from "ethers";

export type SwapExactInputSingleParams = {
  tokenIn: string;
  tokenOut: string;
  amountIn: number;
  amountOutMinimum: number;
  tokenInDecimals: number;
  tokenOutDecimals: number;
  slippage: number;
  deadline: BigNumber;
  sqrtPriceLimitX96?: BigNumber;
};

export type SwapExactOutputSingleParams = {
  tokenIn: string;
  tokenOut: string;
  amountOut: number;
  amountInMaximum: number;
  tokenInDecimals: number;
  tokenOutDecimals: number;
  slippage: number;
  deadline: BigNumber;
  sqrtPriceLimitX96?: BigNumber;
};
