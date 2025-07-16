<script setup lang="ts">
import PopupModal from "~/components/layout/modal/PopupModal.vue";
import ModalHeader from "~/components/layout/modal/ModalHeader.vue";
import TextInput from "~/components/base/input/TextInput.vue";
import ModalBody from "~/components/layout/modal/ModalBody.vue";
import PopularCurrencyInput from "~/components/base/input/currency/PopularCurrencyInput.vue";
import Label from "~/components/base/form/Label.vue";
import FormInput from "~/components/base/form/FormInput.vue";
import { useModalStore } from "~/store/layout/modal.store";
import CurrencySelectorList from "~/components/base/input/currency/CurrencySelectorList.vue";
import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";
import { useHrc20Store } from "~/store/hrc20/hrc20.store";
import { useHrc20Api } from "~/composables/api/hrc20-api.composable";

const toast = useToast();
const modalStore = useModalStore();
const hrc20Store = useHrc20Store();
const hrc20Api = useHrc20Api();

const fetchPage = async (query?: string) => {
  const options = hrc20Store.getPaginationOptions();

  try {
    hrc20Store.setLoading(true);
    const [response, popular] = await Promise.all([
      hrc20Api.$find({ ...options, query }),
      !hrc20Store.popularTokens?.length
        ? hrc20Api.$findPopular()
        : Promise.resolve(null),
    ]);

    hrc20Store.handleResponse(response);
    if (popular) hrc20Store.setPopular(popular);
  } catch (e: any) {
    toast.add({
      color: "error",
      title: "An error occurred while fetching tokens",
      description: e.message,
    });
  } finally {
    hrc20Store.setLoading(false);
  }
};

onMounted(async () => {
  if (hrc20Store.state.tokens.length) return;

  await fetchPage();
});

const nextPage = async () => {
  if (hrc20Store.state.loading || !hrc20Store.hasNextPage) return;

  hrc20Store.setPage(hrc20Store.state.meta!.currentPage + 1);
  await fetchPage();
};

const popularTokens = computed(() => hrc20Store.popularTokens);

const select = (currency: Hrc20Entity) => {
  const modalProps = modalStore.props as { model: Ref<Hrc20Entity> };

  if (modalProps.model) modalProps.model.value! = currency;
  modalStore.close();
};

const updateSearch = async (query: string | undefined) => {
  hrc20Store.setPage(1);
  hrc20Store.state.tokens = [];
  await fetchPage(query);
};
</script>

<template>
  <PopupModal>
    <ModalHeader> Select a token </ModalHeader>
    <ModalBody>
      <div class="flex flex-col gap-sm h-[61svh]">
        <TextInput
          v-model="hrc20Store.state.query"
          icon="mdi:search"
          placeholder="Search by name/symbol or enter the address"
        ></TextInput>
        <FormInput>
          <Label for="popular-currencies">Popular currencies</Label>
          <div class="overflow-auto w-full">
            <PopularCurrencyInput
              class="w-full"
              v-if="popularTokens"
              :currencies="popularTokens"
              @select="select"
            />
          </div>
        </FormInput>
        <div class="h-[1px] w-full bg-border shrink-0"></div>
        <CurrencySelectorList
          class="flex-1 overflow-auto"
          :search-input="hrc20Store.state.query"
          :currencies="hrc20Store.tokens"
          @load-next="nextPage"
          @update-search="updateSearch"
          @select="select"
        />
      </div>
    </ModalBody>
  </PopupModal>
</template>

<style scoped></style>
