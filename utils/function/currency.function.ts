export const formatCurrency = (amount: number, prefix = "$") => {
  if (amount >= 1000000) {
    return `${prefix}${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${prefix}${(amount / 1000).toFixed(1)}K`;
  }
  return `${prefix}${amount.toFixed(0)}`;
};
