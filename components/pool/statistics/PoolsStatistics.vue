<script setup lang="ts">
import StatisticCard from "~/components/pool/StatisticCard.vue";
import type { StatsCard } from "~/utils/type/base.type";
import Tick from "~/components/layout/Tick.vue";

const cards: StatsCard[] = [
  {
    name: "Total TVL",
    value: "$151.2M",
    footer: "+12.5% from last week",
    direction: "up",
    tick: "Test data",
    class: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
    titleClass: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "24h Volume",
    value: "$11.8M",
    footer: "+8.2% from yesterday",
    direction: "up",
    tick: "Test data",
    class: "from-green-500/10 to-emerald-500/10 border-green-500/20",
    titleClass: "text-green-600 dark:text-green-400",
  },
  {
    name: "Avg APR",
    value: "15.12%",
    footer: "-2.1% from last week",
    direction: "down",
    tick: "Test data",
    class: "from-purple-510/10 to-pink-500/10 border-purple-500/20",
    titleClass: "text-purple-600 dark:text-purple-400",
  },
];
</script>

<template>
  <div class="grid laptop:grid-cols-3 gap-4">
    <StatisticCard
      v-for="card in cards"
      :key="card.name"
      :class="card.class"
      :title-class="card.titleClass"
      :direction="card.direction"
    >
      <template #name>
        {{ card.name }}
        <Tick type="warning" class="ml-1">{{ card.tick }}</Tick>
      </template>
      <template #value>{{ card.value }}</template>
      <template #footer>{{ card.footer }}</template>
    </StatisticCard>
  </div>
</template>

<style scoped></style>
