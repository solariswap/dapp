import { ethers } from "ethers";
import { useProvider } from "~/composables/web3/use-provider.composable";
import solariSwap from "~/utils/abi/SolariSwap.json";
import type {
  CreatePoolParams,
  MintLiquidityParams,
} from "~/utils/type/contract/solari-pool-manager.type";

export const useSolariSwap = () => {
  const runtimeConfig = useRuntimeConfig();
  const provider = useProvider();

  const contract = ref<ethers.Contract>();

  onMounted(() => {
    contract.value = new ethers.Contract(
      runtimeConfig.public.solariSwapAddress,
      solariSwap.abi,
      provider.getSigner(),
    );
  });

  const createPool = async (params: CreatePoolParams) => {
    if (!contract.value) {
      throw new Error("Contract not initialized");
    }

    const { token0, token1, plFee, initialTick } = params;

    const tx = await contract.value.createPool(
      token0,
      token1,
      plFee,
      initialTick,
    );

    return tx.wait();
  };

  const mintLiquidity = async (params: MintLiquidityParams) => {
    if (!contract.value) {
      throw new Error("Contract not initialized");
    }

    const tx = await contract.value.mintLiquidity(
      params.token0,
      params.token1,
      params.plFee,
      params.amount0.toBigInt(),
      params.amount1.toBigInt(),
      params.amount0Min.toBigInt(),
      params.amount1Min.toBigInt(),
      params.tickLower,
      params.tickUpper,
    );

    await tx.wait();

    return {
      hash: tx.hash,
    };
  };

  return {
    createPool,
    mintLiquidity,
  };
};
