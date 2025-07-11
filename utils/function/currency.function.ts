import type { TokenCurrency } from "~/utils/type/base.type";
import { Token } from "@uniswap/sdk-core";
import type { BigNumber } from "ethers";

export const formatCurrency = (amount: number, prefix = "$") => {
  if (amount >= 1000000) {
    return `${prefix}${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${prefix}${(amount / 1000).toFixed(1)}K`;
  }
  return `${prefix}${amount.toFixed(2)}`;
};

export const currencyToToken = (currency: TokenCurrency, chainId?: number) => {
  return new Token(
    chainId ?? 42000,
    currency.address,
    currency.decimals,
    currency.symbol,
    currency.name,
  );
};

/**
 * Adjusts a given `BigNumber` value by applying a percentage-based slippage.
 *
 * This function calculates a new value by reducing the input `BigNumber` by
 * the specified slippage percentage. The slippage is subtracted from 100%,
 * and the resulting percentage is used as a multiplier for the original `BigNumber`.
 *
 * @param number - The `BigNumber` to be adjusted.
 * @param slippage - The slippage percentage to apply (as a number, where 1 represents 1%).
 * @returns A new `BigNumber` representing the adjusted value after applying the slippage.
 */
export const bigNumberWithSlippage = (number: BigNumber, slippage: number) => {
  return number.mul(100 - slippage).div(100);
};
