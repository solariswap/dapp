import type {
  BaseQuoteResponse,
  GetQuoteParams,
} from "~/utils/type/composable/quoter-api-composable.type";

export const useQuoterApi = () => {
  const { $api } = useNuxtApp();

  const getQuote = async (
    params: GetQuoteParams,
  ): Promise<BaseQuoteResponse> => {
    return $api<BaseQuoteResponse>("v1/quote", {
      query: {
        ...params,
      },
    });
  };

  return {
    getQuote,
  };
};
