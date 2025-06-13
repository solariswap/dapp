import JSBI from "jsbi";

export function fromReadableAmount(amount: string, decimals: number): string {
  const [wholePart, fractionalPart = ""] = amount.split(".");
  const paddedFractionalPart = fractionalPart.padEnd(decimals, "0");
  const trimmedFractionalPart = paddedFractionalPart.slice(0, decimals);
  return (
    BigInt(wholePart + trimmedFractionalPart) *
    BigInt(10) ** BigInt(decimals - trimmedFractionalPart.length)
  ).toString();
}

/**
 * Count the number of decimal places in a number.
 */
function countDecimals(value: number): number {
  if (Math.floor(value) === value) return 0;
  const str = value.toString();
  if (str.includes("e")) {
    // Handle scientific notation like 1e-7
    const [base, exponent] = str.split("e");
    const decimalsInBase = (base.split(".")[1] || "").length;
    const exponentValue = parseInt(exponent, 10);
    return Math.max(0, exponentValue * -1 + decimalsInBase);
  }
  return str.split(".,")[1]?.length || 0;
}
