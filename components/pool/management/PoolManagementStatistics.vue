<script setup lang="ts">
import type { StatsCard } from "~/utils/type/base.type";
import StatisticCard from "~/components/pool/StatisticCard.vue";

const cards: StatsCard[] = [
  {
    name: "Total TVL",
    value: "$151.2M",
    footer: "+12.5% from last week",
    direction: "up",
    class: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
    titleClass: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "24h Volume",
    value: "$11.8M",
    footer: "+8.2% from yesterday",
    direction: "up",
    class: "from-green-500/10 to-emerald-500/10 border-green-500/20",
    titleClass: "text-green-600 dark:text-green-400",
  },
  {
    name: "APR",
    value: "15.12%",
    footer: "-2.1% from last week",
    direction: "down",
    class: "from-purple-510/10 to-pink-500/10 border-purple-500/20",
    titleClass: "text-purple-600 dark:text-purple-400",
  },
  {
    name: "Fees (24h)",
    value: "$8.4K",
    footer: "+3.2% from yesterday",
    direction: "up",
    class:
      "bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20",
    titleClass: "text-orange-600 dark:text-orange-400",
  },
];
</script>

<template>
  <div class="flex items-center flex-col laptop:flex-row gap-4">
    <StatisticCard
      v-for="card in cards"
      class="w-full"
      :key="card.name"
      :class="card.class"
      :title-class="card.titleClass"
      :direction="card.direction"
    >
      <template #name>{{ card.name }}</template>
      <template #value>{{ card.value }}</template>
      <template #footer>{{ card.footer }}</template>
    </StatisticCard>
  </div>
</template>

<style scoped></style>
