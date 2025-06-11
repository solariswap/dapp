import type { BigNumber } from "ethers";

export type CreateAndMintPositionParams = {
  tokenA: string;
  tokenB: string;
  fee: number;
  tickSpacing: number;
  sqrtPriceX96: string;
  tickLower: number;
  tickUpper: number;
  liquidity: string;
  amount0Max: string;
  amount1Max: string;
};

export type CreatePoolParams = {
  token0: string;
  token1: string;
  plFee: number;
  initialTick: number;
};

export type MintLiquidityParams = {
  token0: string;
  token1: string;
  plFee: number;
  amount0: BigNumber;
  amount1: BigNumber;
  amount0Min: BigNumber;
  amount1Min: BigNumber;
  tickLower: number;
  tickUpper: number;
};
