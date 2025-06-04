<script setup lang="ts">
import PopupModal from "~/components/layout/modal/PopupModal.vue";
import ModalHeader from "~/components/layout/modal/ModalHeader.vue";
import TextInput from "~/components/base/input/TextInput.vue";
import ModalBody from "~/components/layout/modal/ModalBody.vue";
import type { TokenCurrency } from "~/utils/type/base.type";
import PopularCurrencyInput from "~/components/base/input/currency/PopularCurrencyInput.vue";
import Label from "~/components/base/form/Label.vue";
import FormInput from "~/components/base/form/FormInput.vue";
import { useModalStore } from "~/store/layout/modal.store";
import CurrencySelectorList from "~/components/base/input/currency/CurrencySelectorList.vue";
import { currencies } from "~/utils/constant/currency.constant";

const modalStore = useModalStore();

const popularTokens = computed(() => currencies.filter((c) => c.popular));

const searchInput = ref("");

const filteredCurrencies = computed(() => {
  if (!searchInput.value) return currencies;

  return currencies.filter((c) => {
    const input = searchInput.value.toLowerCase();

    return (
      c.name.toLowerCase().includes(input) ||
      c.symbol.toLowerCase().includes(input) ||
      c.address.toLowerCase().includes(input)
    );
  });
});

const select = (currency: TokenCurrency) => {
  const modalProps = modalStore.props as { model: Ref<TokenCurrency> };

  modalProps.model.value = currency;
  modalStore.close();
};
</script>

<template>
  <PopupModal>
    <ModalHeader> Select a token </ModalHeader>
    <ModalBody>
      <div class="flex flex-col gap-sm h-[61svh]">
        <TextInput
          v-model="searchInput"
          icon="mdi:search"
          placeholder="Search by name/symbol or enter the address"
        ></TextInput>
        <FormInput>
          <Label for="popular-currencies">Popular currencies</Label>
          <div class="overflow-auto w-full">
            <PopularCurrencyInput
              class="w-full"
              :currencies="popularTokens"
              @select="select"
            />
          </div>
        </FormInput>
        <div class="h-[1px] w-full bg-border shrink-0"></div>
        <CurrencySelectorList
          class="flex-1 overflow-auto"
          :search-input="searchInput"
          :currencies="filteredCurrencies"
          @select="select"
        />
      </div>
    </ModalBody>
  </PopupModal>
</template>

<style scoped></style>
