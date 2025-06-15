import { ethers } from "ethers";
import { useAppKitProvider } from "@reown/appkit/vue";

export const useProvider = () => {
  const runtimeConfig = useRuntimeConfig();
  const { walletProvider } = useAppKitProvider("eip155");

  const getProvider = () => {
    if (!walletProvider) return null;
    return new ethers.providers.Web3Provider(
      walletProvider as any,
      runtimeConfig.public.chainId,
    );
  };

  const getStaticProvider = () => {
    return new ethers.providers.JsonRpcProvider(runtimeConfig.public.rpcUrl);
  };

  const getSigner = () => {
    return getProvider()?.getSigner();
  };

  return {
    getProvider,
    getStaticProvider,

    getSigner,
  };
};
