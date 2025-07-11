<script setup lang="ts">
import TextInput from "~/components/base/input/TextInput.vue";
import type { TableColumn } from "@nuxt/ui";
import { mockPools } from "~/utils/mock/pools.mock";
import type { Pool } from "~/utils/type/base.type";
import { formatCurrency } from "~/utils/function/currency.function";
import Tick from "~/components/layout/Tick.vue";
import Button from "~/components/base/input/Button.vue";

const searchQuery = ref("");

const data = ref(mockPools);

const columns: TableColumn<Pool>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "TVL",
  },
  {
    header: "APR",
  },
  {
    header: "Volume",
  },
  {
    header: "Fee",
    accessorKey: "fee",
  },
  { id: "actions" },
];
</script>

<template>
  <div>
    <div class="flex items-center gap-4 flex-col laptop:flex-row">
      <TextInput
        v-model="searchQuery"
        class="w-full"
        icon="lucide:search"
        placeholder="Search for pools (e.g., HLS/USDT)"
      ></TextInput>
    </div>
    <div class="relative">
      <div class="absolute inset-0 grid place-items-center z-10">
        <p class="text-4xl font-bold">Coming Soon!</p>
      </div>
      <UTable class="mt-4 bg-background blur" :data :columns sticky>
        <template #name-cell="{ row }">
          <PoolListingCurrency
            :currency0="row.original.token0"
            :currency1="row.original.token1"
          />
        </template>
        <template #TVL-cell="{ row }">
          {{ formatCurrency(row.original.tvl) }}
        </template>
        <template #APR-cell="{ row }">
          <span class="text-green-400">{{ row.original.apr.toFixed(2) }}%</span>
        </template>
        <template #Volume-cell="{ row }">
          {{ formatCurrency(row.original.volume24h) }}
        </template>
        <template #fee-cell="{ row }">
          <Tick>{{ row.original.fee.toFixed(2) }}%</Tick>
        </template>
        <template #actions-cell="{ row }">
          <Button
            color="reverse"
            :to="`/pools/${row.original.id}`"
            class="ml-auto w-fit"
          >
            Manage
          </Button>
        </template>
      </UTable>
    </div>
  </div>
</template>

<style scoped></style>
