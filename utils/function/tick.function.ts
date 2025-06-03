import { TickMath } from "@uniswap/v3-sdk";

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
