import type { BigNumber } from "ethers";

export type ExactInputSingleParams = {
  tokenIn: string;
  tokenOut: string;
  tokenInDecimals: number;
  tokenOutDecimals: number;
  fee: number;
  recipient: string;
  deadline: BigNumber;
  amountIn: number;
  amountOutMinimum: number;
  sqrtPriceLimitX96?: BigNumber;
};

export type ExactOutputSingleParams = {
  tokenIn: string;
  tokenOut: string;
  tokenInDecimals: number;
  tokenOutDecimals: number;
  fee: number;
  recipient: string;
  deadline: BigNumber;
  amountOut: number;
  amountInMaximum: number;
  sqrtPriceLimitX96?: BigNumber;
};

export type ExactInputSingleResponse = {
  hash: string;
};

export type ExactOutputSingleResponse = {
  hash: string;
};
