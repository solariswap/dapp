<script setup lang="ts">
import Alert from "~/components/layout/Alert.vue";
import { usePoolCreationStore } from "~/store/pool-creation.store";
import Button from "~/components/base/input/Button.vue";

defineProps<{
  marketPrice: number;
}>();

const store = usePoolCreationStore();
const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <Alert>
    <div class="flex items-center gap-xs text-blue-400">
      <Icon name="mdi:trending-up" />
      <p class="font-medium">Market Price Recommandation</p>
    </div>
    <div class="flex items-end justify-between gap-sm mt-sm">
      <div>
        <p class="text-2xl font-bold text-blue-400">{{ marketPrice }}</p>
        <p class="text-sm text-muted-foreground">{{ store.priceLabel }}</p>
      </div>
      <Button type="button" color="blue" @click="emit('click')">
        Use Market Price
      </Button>
    </div>
  </Alert>
</template>

<style scoped></style>
