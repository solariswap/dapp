<script setup lang="ts">
import FormGroup from "~/components/base/form/FormGroup.vue";
import FormInput from "~/components/base/form/FormInput.vue";
import Label from "~/components/base/form/Label.vue";
import PriceSelectInput from "~/components/base/input/PriceSelectInput.vue";
import { usePoolCreationStore } from "~/store/pool-creation.store";
import Hint from "~/components/base/form/Hint.vue";

const store = usePoolCreationStore();
</script>

<template>
  <FormGroup>
    <FormInput class="flex-1">
      <Label for="min-price">Min price</Label>
      <PriceSelectInput v-model="store.state.priceRange[0]" />
      <Hint class="text-center">
        {{ store.priceLabel }}
        <br />
        Lower bound of your price range. Your position will be out of range if
        price goes below this.
      </Hint>
    </FormInput>
    <FormInput class="flex-1">
      <Label for="max-price">Max price</Label>
      <PriceSelectInput v-model="store.state.priceRange[1]" />
      <Hint class="text-center">
        {{ store.priceLabel }}
        <br />
        Upper bound of your price range. Your position will be out of range if
        price goes above this.
      </Hint>
    </FormInput>
  </FormGroup>
</template>

<style scoped></style>
