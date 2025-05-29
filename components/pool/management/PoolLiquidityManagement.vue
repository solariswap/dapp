<script setup lang="ts">
import TabListInput from "~/components/base/input/TabListInput.vue";
import type { Pool, TabListItem } from "~/utils/type/base.type";
import PoolAddLiquidity from "~/components/pool/management/liquidity/PoolAddLiquidity.vue";

defineProps<{
  pool: Pool;
}>();

const tabItems = ref<TabListItem[]>([
  {
    label: "Add Liquidity",
    value: "add-liquidity",
  },
  {
    label: "Remove Liquidity",
    value: "remove-liquidity",
  },
]);

const tab = ref<"add-liquidity" | "remove-liquidity">("add-liquidity");

const tabComponent = computed(() => {
  const map: Record<"add-liquidity" | "remove-liquidity", any> = {
    "add-liquidity": PoolAddLiquidity,
    "remove-liquidity": PoolAddLiquidity,
  };

  return map[tab.value];
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <TabListInput :items="tabItems" v-model="tab" />
    <component :is="tabComponent" :pool />
  </div>
</template>

<style scoped></style>
