import { ethers } from "ethers";

export const useWeb3 = () => {
  const chainId = 42000;

  const provider = new ethers.providers.JsonRpcProvider(
    "https://testnet1.helioschainlabs.org",
  );

  const getBalance = async (address: string) => {
    return provider.getBalance(address);
  };

  return {
    provider,

    getBalance,
  };
};
