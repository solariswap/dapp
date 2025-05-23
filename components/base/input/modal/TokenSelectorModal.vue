<script setup lang="ts">
import PopupModal from "~/components/layout/modal/PopupModal.vue";
import ModalHeader from "~/components/layout/modal/ModalHeader.vue";
import TextInput from "~/components/base/input/TextInput.vue";
import ModalBody from "~/components/layout/modal/ModalBody.vue";
import type { TokenCurrency } from "~/utils/type/base.type";

const currencies: TokenCurrency = [
  {
    name: "Helios",
    symbol: "HLS",
    address: "0x0000",
    popular: true,
    logoURI: "https://fr.m.wikipedia.org/wiki/Fichier:Ethereum_logo_2014.svg",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0x0000",
    popular: true,
    logoURI: "https://fr.m.wikipedia.org/wiki/Fichier:Ethereum_logo_2014.svg",
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    address: "0x0000",
    popular: true,
    logoURI: "https://fr.m.wikipedia.org/wiki/Fichier:Bitcoin.svg",
  },
  {
    name: "Solana",
    symbol: "SOL",
    address: "0x0000",
    popular: true,
    logoURI:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIsJL3zRgUrkD3yE3lD7LK0wZWSiRyY1GVg&s",
  },
];

const searchInput = ref("");
</script>

<template>
  <PopupModal>
    <ModalHeader> Select a token </ModalHeader>
    <ModalBody>
      <TextInput
        v-model="searchInput"
        icon="mdi:search"
        placeholder="Search by name/symbol or enter the address"
      ></TextInput>
    </ModalBody>
  </PopupModal>
</template>

<style scoped></style>
