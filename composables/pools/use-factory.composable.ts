import { ethers } from "ethers";
import { useProvider } from "~/composables/web3/use-provider.composable";
import Factory from "@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json";

export const useFactory = () => {
  const contract = ref<ethers.Contract>();
  const provider = useProvider();
  const runtimeConfig = useRuntimeConfig();

  onMounted(() => {
    contract.value = new ethers.Contract(
      runtimeConfig.public.factoryAddress,
      Factory.abi,
      provider.getSigner(),
    );
  });

  const getPool = async (token0: string, token1: string, fee: number) => {
    if (!contract.value) {
      throw new Error("Contract not initialized");
    }
    return await contract.value.getPool(token0, token1, fee);
  };

  return { getPool };
};
