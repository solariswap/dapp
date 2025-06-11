<script setup lang="ts">
import { usePoolCreationStore } from "~/store/pool-creation.store";
import Card from "~/components/layout/Card.vue";
import CurrencyImage from "~/components/pool/CurrencyImage.vue";
import SquareButton from "~/components/base/input/SquareButton.vue";
import Tick from "~/components/layout/Tick.vue";

const store = usePoolCreationStore();

const image1 = computed(() => store.state.currency0?.logoURI);
const image2 = computed(() => store.state.currency1?.logoURI);
const fee = computed(() => store.state.poolFee ?? 0);

const imageCls = "w-10 h-10";
</script>

<template>
  <Card>
    <div class="flex items-center gap-sm justify-between">
      <div class="flex items-center gap-xs">
        <div class="flex items-center">
          <CurrencyImage :class="imageCls" :src="image1" />
          <CurrencyImage
            :class="imageCls"
            class="-translate-x-2"
            :src="image2"
          />
        </div>
        <p class="font-bold">{{ store.poolName }}</p>
        <Tick class="text-sm">Fee {{ fee / 10_000 }}%</Tick>
      </div>
      <SquareButton @click="store.state.step = 0">
        <Icon name="mdi:edit" />
      </SquareButton>
    </div>
  </Card>
</template>

<style scoped></style>
