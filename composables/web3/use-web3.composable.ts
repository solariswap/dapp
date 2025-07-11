import { ethers } from "ethers";

export const useWeb3 = () => {
  const runtimeConfig = useRuntimeConfig();

  const provider = new ethers.providers.JsonRpcProvider(
    runtimeConfig.public.rpcUrl,
  );

  const getBalance = async (address: string) => {
    return provider.getBalance(address);
  };

  return {
    provider,

    getBalance,
  };
};
