export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: runtimeConfig.public.apiBaseUrl,
  });

  return {
    provide: {
      api,
    },
  };
});
