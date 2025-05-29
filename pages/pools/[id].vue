<script setup lang="ts">
import Button from "~/components/base/input/Button.vue";
import { mockPools } from "~/utils/mock/pools.mock";
import PoolLiquidityManagement from "~/components/pool/management/PoolLiquidityManagement.vue";

const { id } = useRoute().params;

const pool = computed(() => mockPools.find((pool) => pool.id === id));
</script>

<template>
  <div class="flex flex-col gap-6">
    <Button
      to="/pools"
      color="reverse"
      class="w-fit"
      leading-icon="lucide:arrow-left"
    >
      Back to Pools
    </Button>
    <PoolManagementHeader v-if="pool" :pool />
    <PoolManagementStatistics class="w-full" />
    <div class="grid laptop:grid-cols-3 gap-6">
      <div class="col-span-2">
        <PoolLiquidityManagement v-if="pool" :pool />
      </div>
      <div class="col-span-1"></div>
    </div>
  </div>
</template>

<style scoped></style>
