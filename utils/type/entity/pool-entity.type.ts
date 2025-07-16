import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";
import type { FeeTier } from "~/utils/constant/fee.constant";

export type PoolEntity = {
  readonly address: string;
  createdAt?: Date;
  token0: Hrc20Entity;
  token1: Hrc20Entity;
  tickSpacing: number;
  fee: FeeTier;
};
