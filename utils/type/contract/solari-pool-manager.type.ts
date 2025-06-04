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
