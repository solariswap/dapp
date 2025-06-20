export const useExplorer = () => {
  const runtimeConfig = useRuntimeConfig();

  const explorerUrl = runtimeConfig.public.explorerUrl;

  const getTransactionUrl = (txHash: string): string => {
    return `${explorerUrl}/tx/${txHash}`;
  };

  const getAddressUrl = (address: string): string => {
    return `${explorerUrl}/address/${address}`;
  };

  const getBlockUrl = (blockNumber: number): string => {
    return `${explorerUrl}/block/${blockNumber}`;
  };

  const open = (url: string): void => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    } else {
      console.warn("Cannot open URL in a non-browser environment");
    }
  };

  return {
    getTransactionUrl,
    getAddressUrl,
    getBlockUrl,

    open,
  };
};
