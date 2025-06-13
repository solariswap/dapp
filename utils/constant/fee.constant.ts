export const FEE_TIERS = {
  LOW: 100,
  NORMAL: 500,
  HIGH: 3000,
  VERY_HIGH: 10000,
} as const;

export type FeeTier = (typeof FEE_TIERS)[keyof typeof FEE_TIERS];

export const FeeTiers = Object.values(FEE_TIERS);
