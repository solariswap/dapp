import { useProvider } from "~/composables/web3/use-provider.composable";
import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { Token } from "@uniswap/sdk-core";
import type { TokenCurrency } from "~/utils/type/base.type";
import { currencyToToken } from "~/utils/function/currency.function";

export const usePool = (poolAddress: string) => {
  const provider = useProvider();

  const getPool = () => {
    return new ethers.Contract(
      poolAddress,
      IUniswapV3PoolABI.abi,
      provider.getProvider()!,
    );
  };

  const getTick = async () => {
    const pool = getPool();

    const slot0 = await pool.slot0();

    return slot0.tick;
  };

  return {
    getTick,
  };
};

export const usePoolFromParameters = (
  currency0: TokenCurrency,
  currency1: TokenCurrency,
  plFee: number,
) => {
  const token0 = currencyToToken(currency0);
  const token1 = currencyToToken(currency1);
  const address = Pool.getAddress(
    token0,
    token1,
    plFee,
    undefined,
    "0xd60f84942Bf4380673ae9642a489955ee4aeCe38",
  );

  return usePool(address);
};
