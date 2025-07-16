<script setup lang="ts">
import CurrencyImage from "~/components/pool/CurrencyImage.vue";
import Tick from "~/components/layout/Tick.vue";
import Button from "~/components/base/input/Button.vue";
import type { PoolEntity } from "~/utils/type/entity/pool-entity.type";

const props = defineProps<{
  entity: PoolEntity;
}>();

const image1 = computed(() => props.entity.token0.logoUri);
const image2 = computed(() => props.entity.token1.logoUri);
const symbol0 = computed(() => props.entity.token0.symbol);
const symbol1 = computed(() => props.entity.token1.symbol);

const poolEntityName = computed(
  () => `${props.entity.token0.symbol}/${props.entity.token1.symbol}`,
);

const isNew = computed(() => {
  if (!props.entity.createdAt) return;

  const createdAt = new Date(props.entity.createdAt);
  // Check if the pool entity was created within the last 7 days
  const now = new Date();
  const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
  return createdAt >= sevenDaysAgo;
});

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
            <p class="font-bold text-3xl">{{ poolEntityName }}</p>
            <Tick v-if="isNew" type="success">New</Tick>
            <Tick>Fee {{ entity.fee / 1000 }}%</Tick>
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
