import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";
import type {
  PaginatedResponse,
  PaginationMeta,
} from "~/utils/type/pagination/pagination.type";

type Hrc20StoreState = {
  tokens: Hrc20Entity[];
  popularTokens: Hrc20Entity[] | null;
  query?: string;
  meta: PaginationMeta | null;
  loading: boolean;
};

export const useHrc20Store = defineStore("hrc20Store", () => {
  const state = ref<Hrc20StoreState>({
    tokens: [],
    popularTokens: null,
    query: undefined,
    meta: null,
    loading: false,
  });

  const handleResponse = (response: PaginatedResponse<Hrc20Entity>) => {
    state.value.tokens.push(...response.data);
    state.value.meta = response.meta;
  };

  const setPopular = (popularTokens: Hrc20Entity[] | null) => {
    state.value.popularTokens = popularTokens;
  };

  const setLoading = (loading: boolean) => {
    state.value.loading = loading;
  };

  const setPage = (page: number) => {
    if (!state.value.meta) return;

    state.value.meta.currentPage = page;
  };

  const getPaginationOptions = () => {
    if (!state.value.meta) return {};

    return {
      page: state.value.meta.currentPage,
    };
  };

  const hasNextPage = computed(() => state.value.meta?.nextPage !== null);
  const tokens = computed(() => state.value.tokens);
  const popularTokens = computed(() => state.value.popularTokens);

  return {
    state,

    handleResponse,
    setPopular,
    setLoading,
    setPage,

    getPaginationOptions,

    hasNextPage,
    tokens,
    popularTokens,
  };
});
