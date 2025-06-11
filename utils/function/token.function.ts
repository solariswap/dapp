import JSBI from "jsbi";

export function fromReadableAmount(amount: number, decimals: number) {
  const extraDigits = Math.pow(10, countDecimals(amount));
  const adjustedAmount = amount * extraDigits;
  return JSBI.divide(
    JSBI.multiply(
      JSBI.BigInt(adjustedAmount),
      JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals)),
    ),
    JSBI.BigInt(extraDigits),
  );
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
  return str.split(".")[1]?.length || 0;
}
