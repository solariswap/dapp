<script setup lang="ts">
import Button from "~/components/base/input/Button.vue";
import PoolsStatistics from "~/components/pool/statistics/PoolsStatistics.vue";
</script>

<template>
  <div>
    <div
      class="flex flex-col laptop:flex-row justify-between items-start gap-sm laptop:gap-2"
    >
      <div class="">
        <h1
          class="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
        >
          Liquidity Pools
        </h1>
        <p class="text-muted-foreground mt-1">
          Provide liquidity and earn fees from trades
        </p>
      </div>
      <Button
        class="w-full laptop:w-auto"
        leading-icon="mdi:plus"
        to="/pools/create"
      >
        Create Pool
      </Button>
    </div>
    <PoolsStatistics class="mt-6" />
    <PoolListingTable class="w-full mt-6" />
  </div>
</template>

<style scoped></style>
