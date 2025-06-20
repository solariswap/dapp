import type { QUOTE_MODE } from "~/utils/constant/quoter-api.constant";
import type { FeeTier } from "~/utils/constant/fee.constant";

export type QuoteMode = (typeof QUOTE_MODE)[keyof typeof QUOTE_MODE];

export type BaseQuoteParams = {
  tokenIn: string;
  tokenOut: string;
  mode: QuoteMode;
  sqrtPriceLimitX96?: string;
};

export type GetQuoteExactInputParams = BaseQuoteParams & {
  mode: "exactInput";
  amountIn: string;
};

export type GetQuoteExactOutputParams = BaseQuoteParams & {
  mode: "exactOutput";
  amountOut: string;
};

export type GetQuoteParams =
  | GetQuoteExactInputParams
  | GetQuoteExactOutputParams;

export type BaseQuoteResponse = {
  tokenIn: string;
  tokenOut: string;
  mode: QuoteMode;
  pool: {
    address: string;
    fee: FeeTier;
    liquidity: string;
    tick: number;
    feeProtocol: number;
    unlocked: boolean;
  };
  sqrtPriceX96After: string;
  amountIn: string;
  amountOut: string;
};
