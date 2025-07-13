import { encodeSqrtRatioX96, TickMath } from "@uniswap/v3-sdk";
import JSBI from "jsbi";

/**
 * Converts a given price to its corresponding tick representation.
 *
 * The tick is calculated based on the logarithmic relation with the price,
 * utilizing a base of 1.0001. This operation is commonly used in financial
 * and trading systems to map prices to discrete intervals for computational efficiency.
 *
 * @param price - The input price to be converted to a tick. The price must be a positive number.
 * @returns The computed tick value, which is a rounded integer corresponding to the input price.
 */
export const priceToTick = (price: number) => {
  if (price <= 0) throw Error("Price must be a positive number.");

  const logBase = Math.log(1.0001);
  return Math.floor(Math.log(price) / logBase);
};

/**
 * Converts a given tick value to its corresponding price.
 *
 * @param tick - The tick value to be converted to a price.
 * @return The price derived from the given tick value.
 */
export function tickToPrice(tick: number): number {
  return Math.pow(1.0001, tick);
}

/**
 * Converts a given price to its corresponding square root price in Q96 fixed-point format.
 *
 * The provided price is first converted into a corresponding tick value using the `priceToTick` function.
 * Then, the `TickMath.getSqrtRatioAtTick` function is used to calculate the square root price based on the tick.
 *
 * @param price - The input price to be converted.
 * @returns The square root price as a Q96 fixed-point value.
 */
export const priceToSqrtPriceX96 = (price: number) => {
  const tick = priceToTick(price);

  return TickMath.getSqrtRatioAtTick(tick);
};

/**
 * Calculate the closest tick for a given token0/token1 amount ratio.
 *
 * @param amount0 Token0 amount (raw integer or float)
 * @param amount1 Token1 amount (raw integer or float)
 * @param decimals0 Decimals of token0
 * @param decimals1 Decimals of token1
 * @returns Closest tick as an integer
 */
export function getTickFromAmounts(
  amount0: number,
  amount1: number,
  decimals0: number,
  decimals1: number,
): number {
  // Normalize the ratio to 18-decimal precision by default
  const scaledAmount0 = JSBI.BigInt((amount0 * 10 ** decimals0).toFixed(0));
  const scaledAmount1 = JSBI.BigInt((amount1 * 10 ** decimals1).toFixed(0));

  // Encode to sqrtPriceX96
  const sqrtPriceX96 = encodeSqrtRatioX96(scaledAmount1, scaledAmount0);

  // Convert to the nearest tick
  return TickMath.getTickAtSqrtRatio(sqrtPriceX96);
}
