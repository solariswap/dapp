import type { BigNumber } from "ethers";

export type QuoteExactInputSingleParams = {
  tokenIn: string;
  tokenOut: string;
  fee: number;
  tokenInDecimals: number;
  amountIn: number;
  sqrtPriceLimitX96?: number;
};

export type QuoteExactInputSingleResponse = {
  amountOut: BigNumber;
  sqrtPriceX96After: BigNumber;
  initializedTicksCrossed: number;
  gasEstimate: BigNumber;
};

export type QuoteExactOutputSingleParams = {
  tokenIn: string;
  tokenOut: string;
  amountOut: number;
  decimalsTokenOut: number;
  fee: number;
  sqrtPriceLimitX96?: number;
};

export type QuoteExactOutputSingleResponse = {
  amountIn: BigNumber;
  sqrtPriceX96After: BigNumber;
  initializedTicksCrossed: number;
  gasEstimate: BigNumber;
};
