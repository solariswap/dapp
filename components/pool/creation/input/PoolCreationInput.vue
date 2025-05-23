<script setup lang="ts"></script>

<template>
  <div class="grid gap-md">
    <p class="font-bold text-3xl"><slot name="title" /></p>
    <slot name="input" />
  </div>
</template>

<style scoped></style>
