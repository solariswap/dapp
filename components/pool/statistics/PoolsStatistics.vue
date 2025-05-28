<script setup lang="ts">
type StatsCard = {
  name: string;
  value: string;
  footer: string;
  direction: "down" | "up";
  class: string;
  titleClass: string;
};

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
    name: "Avg APR",
    value: "15.12%",
    footer: "-2.1% from last week",
    direction: "down",
    class: "from-purple-510/10 to-pink-500/10 border-purple-500/20",
    titleClass: "text-purple-600 dark:text-purple-400",
  },
];
</script>

<template>
  <div class="grid laptop:grid-cols-3 gap-4">
    <div
      v-for="card in cards"
      :key="card.name"
      class="rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-to-r p-6"
      :class="card.class"
    >
      <h3 class="tracking-tight text-sm font-medium" :class="card.titleClass">
        {{ card.name }}
      </h3>
      <p class="text-2xl font-bold mt-2">{{ card.value }}</p>
      <div class="flex items-center text-sm text-muted-foreground gap-1">
        <Icon
          :name="
            card.direction === 'up'
              ? 'lucide:trending-up'
              : 'lucide:trending-down'
          "
          :class="{
            'text-green-500': card.direction === 'up',
            'text-red-500': card.direction === 'down',
          }"
        />
        <p>{{ card.footer }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
