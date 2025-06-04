import { ethers } from "ethers";
import { useProvider } from "~/composables/web3/use-provider.composable";
import solariPoolManager from "~/utils/abi/SolariPoolManager.json";
import type { CreateAndMintPositionParams } from "~/utils/type/contract/solari-pool-manager.type";

export const useSolariPoolManager = () => {
  const runtimeConfig = useRuntimeConfig();
  const provider = useProvider();

  const contract = ref<ethers.Contract>();

  onMounted(() => {
    contract.value = new ethers.Contract(
      runtimeConfig.public.solariPoolManagerAddress,
      solariPoolManager.abi,
      provider.getSigner(),
    );
  });

  const createAndMintPosition = async (params: CreateAndMintPositionParams) => {
    console.log(params);
    const tx = await contract.value?.createAndMintPosition(
      params.tokenA,
      params.tokenB,
      params.fee,
      params.tickSpacing,
      params.sqrtPriceX96,
      params.tickLower,
      params.tickUpper,
      params.liquidity,
      params.amount0Max,
      params.amount1Max,
    );

    return tx.wait();
  };

  return {
    createAndMintPosition,
  };
};
