<script setup lang="ts">
import type { Pool } from "~/utils/type/base.type";
import CurrencyImage from "~/components/pool/CurrencyImage.vue";
import Tick from "~/components/layout/Tick.vue";
import Button from "~/components/base/input/Button.vue";

const props = defineProps<{
  pool: Pool;
}>();

const image1 = computed(() => props.pool.token0.logoURI);
const image2 = computed(() => props.pool.token1.logoURI);
const symbol0 = computed(() => props.pool.token0.symbol);
const symbol1 = computed(() => props.pool.token1.symbol);

const poolName = computed(
  () => `${props.pool.token0.symbol}/${props.pool.token1.symbol}`,
);

const imageCls = "w-16 h-16";
</script>

<template>
  <div class="card large">
    <div
      class="flex items-center flex-col laptop:flex-row justify-between gap-4"
    >
      <div class="flex items-center gap-4">
        <div class="flex items-center">
          <CurrencyImage :symbol="symbol0" :class="imageCls" :src="image1" />
          <CurrencyImage
            :symbol="symbol1"
            :class="imageCls"
            class="-translate-x-4"
            :src="image2"
          />
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-3">
            <p class="font-bold text-3xl">{{ poolName }}</p>
            <Tick v-if="pool.isNew" type="success">New</Tick>
            <Tick>Fee {{ pool.fee / 1000 }}%</Tick>
          </div>
          <div class="flex items-center gap-4">
            <p>Pool ID: 1</p>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <Button leading-icon="lucide:star" color="reverse">
          Add to watchlist
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
