import type { PoolEntity } from "~/utils/type/entity/pool-entity.type";
import type { FeeTier } from "~/utils/constant/fee.constant";

export const usePoolsApi = () => {
  const { $api } = useNuxtApp();

  const findByAddress = (address: string) =>
    useApiFetch<PoolEntity>(`/v1/pools/${address}`);

  const $getAvailable = (token0: string, token1: string) =>
    $api<FeeTier[]>("/v1/pools/available", {
      query: { token0, token1 },
    });

  return {
    findByAddress,

    $getAvailable,
  };
};
