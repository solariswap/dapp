<script setup lang="ts">
const title = "The brightest way to trade cryptocurrencies";
const description =
  "The first native DEX on Helios enabling cross-chain swaps, automation, and MEV-resistant execution powered by interchain staking.";

useSeoMeta({
  titleTemplate: "SolariSwap - %s",
  title,
  description,
  ogImage: "/images/og.webp",
  ogTitle: title,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  ogType: "website",
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style scoped></style>
