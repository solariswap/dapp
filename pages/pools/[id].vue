<script setup lang="ts">
import Button from "~/components/base/input/Button.vue";
import { mockPools } from "~/utils/mock/pools.mock";
import PoolLiquidityManagement from "~/components/pool/management/PoolLiquidityManagement.vue";
import PoolUserPosition from "~/components/pool/management/position/PoolUserPosition.vue";
import PoolComposition from "~/components/pool/management/position/PoolComposition.vue";

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
    <div v-if="pool" class="grid grid-cols-1 laptop:grid-cols-3 gap-6">
      <div class="laptop:col-span-2">
        <PoolLiquidityManagement :pool />
      </div>
      <div class="col-span-1 flex flex-col gap-6">
        <PoolUserPosition :pool />
        <PoolComposition :pool />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
