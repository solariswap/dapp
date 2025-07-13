import type {
  PaginatedResponse,
  PaginationOptions,
} from "~/utils/type/pagination/pagination.type";
import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";

export const useHrc20Api = () => {
  const { $api } = useNuxtApp();

  const $find = (params?: PaginationOptions & { query?: string }) =>
    $api<PaginatedResponse<Hrc20Entity>>("/v1/hrc20", {
      query: params,
    });

  const $findPopular = () => $api<Hrc20Entity[]>("/v1/hrc20/popular");

  return { $find, $findPopular };
};
