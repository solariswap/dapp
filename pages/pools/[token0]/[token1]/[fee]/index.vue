<script setup lang="ts">
import Button from "~/components/base/input/Button.vue";
import { mockPools } from "~/utils/mock/pools.mock";
import PoolLiquidityManagement from "~/components/pool/management/PoolLiquidityManagement.vue";
import PoolUserPosition from "~/components/pool/management/position/PoolUserPosition.vue";
import PoolComposition from "~/components/pool/management/position/PoolComposition.vue";
import { usePoolFromParameters } from "~/composables/pools/use-pool.composable";

const { token0, token1, fee } = useRoute().params;

definePageMeta({
  validate: (route) => {
    const evmAddressRegex = /^0x[a-fA-F0-9]{40}$/;

    const tokens = [route.params.token0, route.params.token1];
    for (const token of tokens) {
      if (!evmAddressRegex.test(token as string)) {
        return false;
      }
    }

    return !isNaN(parseInt(route.params.fee as string, 10));
  },
});

// const realPool = usePoolFromParameters(
//   token0.toString(),
//   token1.toString(),
//   parseInt(fee.toString(), 10),
// );

const pool = computed(() =>
  mockPools.find((pool) => {
    return (
      pool.token0.address === token0 &&
      pool.token1.address === token1 &&
      pool.fee === parseInt(fee.toString(), 10)
    );
  }),
);

useSeoMeta({
  title: "Pool Management",
});
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
