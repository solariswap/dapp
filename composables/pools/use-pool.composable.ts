import { useProvider } from "~/composables/web3/use-provider.composable";
import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { currencyToToken } from "~/utils/function/currency.function";
import { FeeTiers } from "~/utils/constant/fee.constant";
import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";

export const usePool = (
  poolAddress: string,
  _provider?: ReturnType<typeof useProvider>,
) => {
  const provider = _provider ?? useProvider();

  const getPool = () => {
    return new ethers.Contract(
      poolAddress,
      IUniswapV3PoolABI.abi,
      provider.getStaticProvider()!,
    );
  };

  const getTick = async () => {
    const pool = getPool();

    const slot0 = await pool.slot0();

    return slot0.tick;
  };

  const getFee = () => {
    const pool = getPool();

    return pool.fee();
  };

  const getLiquidity = async () => {
    const pool = getPool();

    return BigInt(pool.liquidity());
  };

  const getTokens = async (): Promise<[string, string]> => {
    const pool = getPool();

    return await Promise.all([pool.token0(), pool.token1()]);
  };

  const getAddress = () => {
    return poolAddress;
  };

  return {
    getTick,
    getFee,
    getLiquidity,
    getTokens,
    getAddress,
  };
};

export const usePoolFromParameters = (
  currency0: Hrc20Entity,
  currency1: Hrc20Entity,
  plFee: number,
) => {
  const runtimeConfig = useRuntimeConfig();

  const token0 = currencyToToken(currency0);
  const token1 = currencyToToken(currency1);
  const address = Pool.getAddress(
    token0,
    token1,
    plFee,
    undefined,
    runtimeConfig.public.factoryAddress,
  );

  return usePool(address);
};

export const usePoolManager = () => {
  const runtimeConfig = useRuntimeConfig();
  const provider = useProvider();

  const getPoolFromCurrencies = async (
    currency0: Hrc20Entity,
    currency1: Hrc20Entity,
    ignoreLiquidity?: boolean,
  ) => {
    const sortedCurrencies = [currency0, currency1].sort((a, b) => {
      return a.address.localeCompare(b.address);
    });

    const token0 = currencyToToken(sortedCurrencies[0]);
    const token1 = currencyToToken(sortedCurrencies[1]);

    const addresses = FeeTiers.map((plFee) => {
      return Pool.getAddress(
        token0,
        token1,
        plFee,
        undefined,
        runtimeConfig.public.factoryAddress,
      );
    });

    const status = await Promise.all(
      addresses.map(async (address) => {
        try {
          const [liquidity, slot0] = await Promise.all([
            getLiquidity(address),
            getSlot0(address),
          ]);
          return {
            address,
            isCreated: ignoreLiquidity || liquidity > 0n,
            tick: slot0.tick,
            liquidity,
          };
        } catch (e) {
          return {
            address,
            liquidity: 0n,
            tick: 0,
            isCreated: false,
          };
        }
      }),
    );

    if (status.filter((p) => p.isCreated).length === 0)
      throw new Error("No pool found for the given currencies");

    const sorted = status.toSorted((a, b) => {
      return a.liquidity > b.liquidity ? 1 : -1;
    });
    const found = sorted.find((s) => s.isCreated) ?? status[0];

    return usePool(found.address, provider);
  };

  const getLiquidity = async (address: string) => {
    const _provider = provider.getStaticProvider();
    const contract = new ethers.Contract(
      address,
      IUniswapV3PoolABI.abi,
      _provider,
    );

    const liquidity = await contract.liquidity();
    return BigInt(liquidity);
  };

  const getSlot0 = async (address: string) => {
    const _provider = provider.getStaticProvider();
    const contract = new ethers.Contract(
      address,
      IUniswapV3PoolABI.abi,
      _provider,
    );

    return await contract.slot0();
  };

  return { getPoolFromCurrencies };
};
