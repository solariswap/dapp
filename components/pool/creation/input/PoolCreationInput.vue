<script setup lang="ts">
import Card from "~/components/layout/Card.vue";
import Form from "~/components/base/form/Form.vue";
import FormInput from "~/components/base/form/FormInput.vue";
import Label from "~/components/base/form/Label.vue";
import CurrencySelector from "~/components/base/input/CurrencySelector.vue";
</script>

<template>
  <div class="grid gap-md">
    <p class="font-bold text-3xl"><slot name="title" /></p>
    <Card>
      <Form>
        <FormInput>
          <Label for="base-token">Base Token</Label>
          <CurrencySelector id="base-token" />
        </FormInput>
        <FormInput>
          <Label for="quote-token">Quote Token</Label>
          <CurrencySelector id="quote-token" />
        </FormInput>
      </Form>
    </Card>
  </div>
</template>

<style scoped></style>
