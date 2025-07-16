import { ethers } from "ethers";
import { useAppKitProvider } from "@reown/appkit/vue";
import { type Provider } from "@reown/appkit/vue";

export const useProvider = () => {
  const runtimeConfig = useRuntimeConfig();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");

  const getProvider = () => {
    if (!walletProvider) return null;
    return new ethers.providers.Web3Provider(walletProvider, {
      name: runtimeConfig.public.chainName,
      chainId: parseInt(runtimeConfig.public.chainId, 10),
    });
  };

  const getStaticProvider = () => {
    return new ethers.providers.JsonRpcProvider(runtimeConfig.public.rpcUrl, {
      name: runtimeConfig.public.chainName,
      chainId: parseInt(runtimeConfig.public.chainId, 10),
    });
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
