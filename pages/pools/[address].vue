<script setup lang="ts">
import Button from "~/components/base/input/Button.vue";
import { mockPools } from "~/utils/mock/pools.mock";
import PoolLiquidityManagement from "~/components/pool/management/PoolLiquidityManagement.vue";
import PoolUserPosition from "~/components/pool/management/position/PoolUserPosition.vue";
import PoolComposition from "~/components/pool/management/position/PoolComposition.vue";
import {
  usePool,
  usePoolFromParameters,
} from "~/composables/pools/use-pool.composable";
import { usePoolsApi } from "~/composables/api/pools-api.composable";
import type { GetPoolPayload } from "~/utils/type/composable/pools-composable.type";

const { address } = useRoute().params;
const pool = usePool(address as string);
const poolsApi = usePoolsApi();

definePageMeta({
  validate: (route) => {
    const evmAddressRegex = /^0x[a-fA-F0-9]{40}$/;

    const address = route.params.address as string;
    return evmAddressRegex.test(address as string);
  },
});

const { data: poolEntity } = await poolsApi.findByAddress(address as string);
const payload = ref<GetPoolPayload>();

onMounted(async () => {
  payload.value = await pool.getPayload();
  console.log(payload.value);
});

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
    {{ poolEntity }}
    {{ payload }}
    <PoolManagementHeader v-if="poolEntity" :entity="poolEntity" />
    <PoolManagementStatistics class="w-full" />
    <div v-if="poolEntity" class="grid grid-cols-1 laptop:grid-cols-3 gap-6">
      <div class="laptop:col-span-2">
        <!--        <PoolLiquidityManagement :pool />-->
      </div>
      <div class="col-span-1 flex flex-col gap-6">
        <!--        <PoolUserPosition :pool />-->
        <!--        <PoolComposition :pool />-->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
