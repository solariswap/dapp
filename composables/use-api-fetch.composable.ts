import type { UseFetchOptions } from "#app";

export const useApiFetch = <ResT = any>(
  url: string,
  options?: UseFetchOptions<ResT>,
) => {
  const runtimeConfig = useRuntimeConfig();

  return useFetch<ResT>(url, {
    baseURL: runtimeConfig.public.apiBaseUrl,
    ...(options as any),
  });
};
