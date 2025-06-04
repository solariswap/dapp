<script setup lang="ts">
import PoolCreator from "~/components/pool/creation/PoolCreator.vue";
import { useSolariPoolManager } from "~/composables/web3/contracts/use-solari-pool-manager.composable";
import { ethers } from "ethers";
import {
  priceToSqrtPriceX96,
  priceToTick,
} from "~/utils/function/tick.function";
import { nearestUsableTick, TickMath } from "@uniswap/v3-sdk";
import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { Pool, Position } from "@uniswap/v4-sdk";

const poolManager = useSolariPoolManager();

useSeoMeta({
  title: "Create a new pool",
});

const testTx = async () => {
  const HLS = new Token(
    42000,
    "0x0000000000000000000000000000000000000000",
    18,
    "HLS",
    "Helios",
  );
  const TST = new Token(
    42000,
    "0x3CCd65D81d84eF4CB3175710b4c6D70ca5068E77",
    18,
    "TST",
    "Test Token",
  );

  const fee = 500;
  const tickSpacing = 10;
  const sqrtPriceX96 = priceToSqrtPriceX96(5);

  const pool = new Pool(
    HLS,
    TST,
    fee,
    tickSpacing,
    "0x0000000000000000000000000000000000000000",
    sqrtPriceX96,
    0,
    priceToTick(5),
  );

  const tickLower = nearestUsableTick(TickMath.MIN_TICK, tickSpacing);
  const tickUpper = nearestUsableTick(TickMath.MAX_TICK, tickSpacing);

  const amountHLS = CurrencyAmount.fromRawAmount(
    HLS,
    ethers.utils.parseEther("100").toString(),
  );
  const amountTST = CurrencyAmount.fromRawAmount(
    TST,
    ethers.utils.parseEther("500").toString(),
  );

  console.log(amountHLS.toExact());

  const position = Position.fromAmounts({
    pool,
    tickLower,
    tickUpper,
    amount0: amountHLS.toExact(),
    amount1: amountTST.toExact(),
    useFullPrecision: true,
  });

  console.log(`Position: ${position.liquidity}`);

  await poolManager.createAndMintPosition({
    tokenA: "0x0000000000000000000000000000000000000000",
    tokenB: "0x3CCd65D81d84eF4CB3175710b4c6D70ca5068E77", //TST token
    fee: 500,
    tickSpacing: 10,
    sqrtPriceX96: priceToSqrtPriceX96(5).toString(),
    tickLower: TickMath.MIN_TICK,
    tickUpper: TickMath.MAX_TICK,
    liquidity: position.liquidity.toString(),
    amount0Max: ethers.utils.parseEther("100").toString(),
    amount1Max: ethers.utils.parseEther("500").toString(),
  });
};
</script>

<template>
  <button @click="testTx">Test tx</button>
  <PoolCreator />
</template>
<style scoped></style>
