import type { FeeTier } from "~/utils/constant/fee.constant";
import type { BigNumber } from "ethers";

export type GetPoolPayload = {
  address: string;
  token0: string;
  token1: string;
  fee: FeeTier;
  liquidity: BigNumber;
  tick: number;
};
