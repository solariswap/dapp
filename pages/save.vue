<script setup lang="ts">
import { ethers } from "ethers";
import PoolManagerABI from "~/utils/abi/PoolManager.json";
import StateViewABI from "~/utils/abi/StateView.json";
import PositionManagerABI from "~/utils/abi/PositionManager.json";
import Erc20ABI from "~/utils/abi/ERC20.json";
import {
  type BigintIsh,
  type Currency,
  Ether,
  NativeCurrency,
  sqrt,
  Token,
} from "@uniswap/sdk-core";
import JSBI from "jsbi";
// import { Actions, Pool, type PoolKey } from "@uniswap/v4-sdk";
import { slice } from "viem";
import Swapper from "~/components/swap/Swapper.vue";
/*
const chainId = 42000;
// const tokenA = new Token(chainId, "", 18, "WHLS", "Wrapped HLS");

const provider = new ethers.providers.JsonRpcProvider(
  "https://testnet1.helioschainlabs.org",
);

// unused private key for testing purposes
const wallet = new ethers.Wallet(
  "0x2b17b39c8ed9520fd87ce132d98afb27f2c341223e14c6a9ebc93923a479e00f",
  provider,
);

const poolManager = new ethers.Contract(
  "0xebd825164B8abFA0Eb29dcBa2EC822C7735a1B1D",
  PoolManagerABI.abi,
  wallet,
);

class NativeHLS extends NativeCurrency {
  constructor() {
    super(chainId, 18, "HLS", "Helios");
  }

  override equals(other: Currency): boolean {
    return true;
  }

  get wrapped(): Token {
    return new Token(chainId, "", 18, "WHLS", "Wrapped HLS");
  }
}
//
const test = async () => {
  const contract = new ethers.Contract(
    "0xEA7fBdF2b91Ca0b845E546eAd1FA90B91639F564",
    StateViewABI.abi,
    provider,
  );

  // const balance = await provider.getBalance(
  //   "0x533a94a4803cc3B7557360E5bEfDE3A6d4eaA1d7",
  // );

  // console.log(ethers.utils.formatEther(balance));
  // const recipient = await contract();
  // console.log(recipient);
};

const createPool = async () => {
  const token0 = "0x0000000000000000000000000000000000000000";
  const token1 = "0x3aeAf44F10201AffBa70f0193E50Bb20BA1adB24";
  const tokens = token0 < token1 ? [token0, token1] : [token1, token0];

  // const poolKey: PoolKey = {
  //   currency0: tokens[0],
  //   currency1: tokens[1],
  //   fee: 1000,
  //   tickSpacing: 10,
  //   hooks: "0x0000000000000000000000000000000000000000",
  // };
  //
  // const startingPrice = encodeSqrtRatioX96(1000, 1);
  //
  // const response = await poolManager.initialize(
  //   poolKey,
  //   BigInt(startingPrice as unknown as bigint),
  // );
  //
  // console.log(response);
};

const getPool = async () => {
  const token2 = new Token(
    chainId,
    "0x3aeAf44F10201AffBa70f0193E50Bb20BA1adB24",
    18,
    "TKN2",
  );

  const poolId = Pool.getPoolId(
    new NativeHLS(),
    token2,
    1000,
    10,
    "0x0000000000000000000000000000000000000000",
  );

  const stateView = new ethers.Contract(
    "0x4B5d18b7347B154a203e440C297d2595Cf9aF67a",
    StateViewABI.abi,
    wallet,
  );

  const encodedPoolId = ethers.utils.hexlify(poolId);
  const response = await stateView.getSlot0(encodedPoolId);

  return response.tick;
};

onMounted(() => {
  // poolManager.on(
  //   "Initialize",
  //   (id, currency0, currency1, fee, tickSpacing, hooks, sqrtPriceX96, tick) => {
  //     console.log("New pool created: ");
  //     console.log(`Pool ID: ${id}`);
  //     console.log(`Token 0: ${currency0}`);
  //     console.log(`Token 1: ${currency1}`);
  //     console.log(`Fee: ${fee}`);
  //     console.log(`Tick Spacing: ${tickSpacing}`);
  //     console.log(`Hooks: ${hooks}`);
  //     console.log(`Tick: ${sqrtPriceX96}`);
  //     console.log(`Tick: ${tick}`);
  //   },
  // );
});

function encodeSqrtRatioX96(amount1: BigintIsh, amount0: BigintIsh): JSBI {
  const numerator = JSBI.leftShift(JSBI.BigInt(amount1), JSBI.BigInt(192));
  const denominator = JSBI.BigInt(amount0);
  const ratioX192 = JSBI.divide(numerator, denominator);
  return sqrt(ratioX192);
}

const depositLiquidity = async () => {
  const positionManager = new ethers.Contract(
    "0x06A2fe3c6249891b37fF714F0c334639772B488b",
    PositionManagerABI.abi,
    wallet,
  );

  const tokenContract = new ethers.Contract(
    "0x3aeAf44F10201AffBa70f0193E50Bb20BA1adB24",
    Erc20ABI.abi,
    wallet,
  );

  const approveTx = await tokenContract.approve(
    positionManager.address,
    ethers.constants.MaxUint256,
  );

  console.log("Approve tx: ", approveTx.hash);

  const abiCoder = ethers.utils.defaultAbiCoder;

  // const poolKey: PoolKey = {
  //   currency0: "0x0000000000000000000000000000000000000000",
  //   currency1: "0x3aeAf44F10201AffBa70f0193E50Bb20BA1adB24",
  //   fee: 1000,
  //   tickSpacing: 10,
  //   hooks: "0x0000000000000000000000000000000000000000",
  // };
  //
  // const encodedParams = abiCoder.encode(
  //   [
  //     PoolKey
      // "tuple(address currency0, address currency1, uint24 fee, int24 tickSpacing, address hooks)",
      // "int24",
      // "int24", // tickLower, tickUpper
      // "uint256", // liquidity
      // "uint128",
      // "uint128", // amount0Max, amount1Max
      // "address", // owner
      // "bytes", // hookData
    // ],
    // [
    //   [
    //     poolKey.currency0,
    //     poolKey.currency1,
    //     poolKey.fee,
    //     poolKey.tickSpacing,
    //     poolKey.hooks,
    //   ],
    //   -60000,
    //   60000,
    //   ethers.utils.parseUnits("1", 18),
    //   ethers.utils.parseUnits("1", 18),
    //   ethers.utils.parseUnits("2", 18),
    //   await wallet.getAddress(),
    //   "0x",
    // ],
  );

  // console.log(encodedParams);
  // const unlockData = "0x04" + encodedParams.slice(2);

  // console.log(unlockData);
  // const deadline = Math.floor(Date.now() / 1000) + 60 * 10;
  //
  // const tx = await positionManager.modifyLiquidities(unlockData, deadline, {
  //   gasLimit: 1_000_000,
  // });

  // console.log(tx);
  //
  // const res = await tx.wait();

  // console.log("res", res);

  // const tickLower = -60000;
  // const tickUpper = 60000;
  // const liquidity = ethers.utils.parseUnits("1", 18);
  //
  // await positionManagerContract.modifyLiquidity();
};

// const swap = async () => {
// }

const price = ref<number>(0);

const updatePool = async () => {
  const tick = await getPool();

  price.value = Math.pow(1.0001, tick);
};

onMounted(async () => {
  const tick = await getPool();

  price.value = Math.pow(1.0001, tick);
});*/
</script>

<template></template>

<style scoped></style>
