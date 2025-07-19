import { Token } from "@uniswap/sdk-core";
import { type BigNumber, type BigNumberish, ethers } from "ethers";
import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";
import type { FormatTokenDecimalsOptions } from "~/utils/type/function/currency.type";

export const formatCurrency = (amount: number, prefix = "$") => {
  if (amount >= 1000000) {
    return `${prefix}${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${prefix}${(amount / 1000).toFixed(1)}K`;
  }
  return `${prefix}${amount.toFixed(2)}`;
};

export const formatTokenDecimals = (
  amount: BigNumberish,
  currency: Hrc20Entity,
  options?: FormatTokenDecimalsOptions,
) => {
  const [minDecimals, maxDecimals, smallAmountThreshold, ticker] = [
    options?.minDecimals ?? 2,
    options?.maxDecimals ?? 6,
    options?.smallAmountThreshold ?? 1,
    options?.ticker ?? true,
  ];

  const decimals = currency.decimals || 18; // Default to 18 if not specified
  const value = parseFloat(ethers.utils.formatUnits(amount, decimals));
  const suffix = ticker ? ` ${currency.symbol}` : "";

  if (value === 0) return `0${suffix}`;

  const precision =
    value < smallAmountThreshold
      ? Math.min(decimals, maxDecimals + 2) // more precision for tiny values
      : maxDecimals;

  return `${value.toLocaleString("en-US", {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: precision,
  })}${suffix}`;
};

export const hrc20ToToken = (currency: Hrc20Entity, chainId?: number) => {
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
