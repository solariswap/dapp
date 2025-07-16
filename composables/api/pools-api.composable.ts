import type { PoolEntity } from "~/utils/type/entity/pool-entity.type";

export const usePoolsApi = () => {
  const { $api } = useNuxtApp();

  const findByAddress = (address: string) =>
    useApiFetch<PoolEntity>(`/v1/pools/${address}`);

  return {
    findByAddress,
  };
};
