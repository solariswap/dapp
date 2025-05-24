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

const modalStore = useModalStore();

const currencies: TokenCurrency[] = [
  {
    name: "Helios",
    symbol: "HLS",
    address: "0x00001",
    decimals: 18,
    popular: true,
    logoURI:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/512px-Ethereum_logo_2014.svg.png",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0x00002",
    decimals: 18,
    popular: true,
    logoURI:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/512px-Ethereum_logo_2014.svg.png",
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    address: "0x00003",
    decimals: 18,
    popular: true,
    logoURI:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  },
  {
    name: "Solana",
    symbol: "SOL",
    address: "0x00004",
    decimals: 18,
    popular: true,
    logoURI:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIsJL3zRgUrkD3yE3lD7LK0wZWSiRyY1GVg&s",
  },
  {
    name: "XRP",
    symbol: "XRP",
    address: "0x00005",
    decimals: 18,
    popular: false,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
  },
  {
    name: "BNB",
    symbol: "BNB",
    address: "0x00006",
    decimals: 18,
    popular: false,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    address: "0x00007",
    decimals: 18,
    popular: false,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    address: "0x00008",
    decimals: 18,
    popular: false,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
  },
];

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
          <PopularCurrencyInput
            class="w-full"
            :currencies="popularTokens"
            @select="select"
          />
        </FormInput>
        <div class="h-[1px] w-full bg-border shrink-0"></div>
        <CurrencySelectorList
          class="flex-1 overflow-auto"
          :currencies="filteredCurrencies"
          @select="select"
        />
      </div>
    </ModalBody>
  </PopupModal>
</template>

<style scoped></style>
