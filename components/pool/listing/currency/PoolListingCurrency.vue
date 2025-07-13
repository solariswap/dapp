<script setup lang="ts">
import CurrencyImage from "~/components/pool/CurrencyImage.vue";
import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";

const props = defineProps<{
  currency0: Hrc20Entity;
  currency1: Hrc20Entity;
}>();

const image1 = computed(() => props.currency0.logoUri);
const image2 = computed(() => props.currency1.logoUri);
const symbol0 = computed(() => props.currency0.symbol);
const symbol1 = computed(() => props.currency1.symbol);

const imageCls = "w-10 h-10";
</script>

<template>
  <div class="flex items-center gap-xs">
    <div class="flex items-center">
      <CurrencyImage :symbol="symbol0" :class="imageCls" :src="image1" />
      <CurrencyImage
        :symbol="symbol1"
        :class="imageCls"
        class="-translate-x-2"
        :src="image2"
      />
    </div>
    <p class="text-foreground font-bold text-lg">
      {{ currency0.symbol }}/{{ currency1.symbol }}
    </p>
  </div>
</template>

<style scoped></style>
