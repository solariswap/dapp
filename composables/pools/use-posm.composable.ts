import { useProvider } from "~/composables/web3/use-provider.composable";
import { ethers } from "ethers";
import PositionManager from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";

export const usePosm = () => {
  const provider = useProvider();
  const runtimeConfig = useRuntimeConfig();
  const contract = ref<ethers.Contract>();

  onMounted(() => {
    contract.value = new ethers.Contract(
      "0x362f131bbd5FBcDD8E18A1F4D4141564Bfa9A081",
      PositionManager.abi,
      provider.getSigner(),
    );
  });

  const factory = () => {
    if (!contract.value) {
      throw new Error("Contract not initialized");
    }
    return contract.value.factory();
  };

  const mint = async (params: any) => {
    if (!contract.value) return;

    // console.log({
    //   token0: params.token0,
    //   token1: params.token1,
    //   fee: params.fee,
    //   tickLower: params.tickLower,
    //   tickUpper: params.tickUpper,
    //   amount0Desired: params.amount0Desired.toBigInt(),
    //   amount1Desired: params.amount1Desired.toBigInt(),
    //   amount0Min: params.amount0Min.toBigInt(),
    //   amount1Min: params.amount1Min.toBigInt(),
    //   recipient: params.recipient,
    //   deadline: params.deadline.toBigInt(),
    // });
    const tx = await contract.value.mint({
      token0: params.token0,
      token1: params.token1,
      fee: params.fee,
      tickLower: params.tickLower,
      tickUpper: params.tickUpper,
      amount0Desired: params.amount0Desired,
      amount1Desired: params.amount1Desired,
      amount0Min: params.amount0Min,
      amount1Min: params.amount1Min,
      recipient: params.recipient,
      deadline: params.deadline,
    });

    console.log("Mint response", await tx.wait());

    return {
      hash: tx.hash,
    };
  };

  const decreaseLiquidity = async (params: any) => {
    if (!contract.value) return;

    const tx = await contract.value.decreaseLiquidity({
      tokenId: params.tokenId,
      liquidity: params.liquidity.toBigInt(),
      amount0Min: params.amount0Min.toBigInt(),
      amount1Min: params.amount1Min.toBigInt(),
      deadline: params.deadline.toBigInt(),
    });

    await tx.wait();

    return {
      hash: tx.hash,
    };
  };

  const collect = async (params: any) => {
    if (!contract.value) return;

    const tx = await contract.value.collect({
      tokenId: params.tokenId,
      recipient: params.recipient,
      amount0Max: params.amount0Max.toBigInt(),
      amount1Max: params.amount1Max.toBigInt(),
    });

    await tx.wait();

    return {
      hash: tx.hash,
    };
  };

  return { factory, mint, decreaseLiquidity, collect };
};
