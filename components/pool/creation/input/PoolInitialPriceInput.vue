<script setup lang="ts">
import Card from "~/components/layout/Card.vue";
import PoolSummary from "~/components/pool/creation/summary/PoolSummary.vue";
</script>

<template>
  <PoolCreationInput>
    <template #title>Next, choose your pool initial price</template>
    <template #input>
      <PoolSummary />
      <Card> </Card>
    </template>
  </PoolCreationInput>
</template>

<style scoped></style>
