<script setup lang="ts">
import Card from "~/components/layout/Card.vue";
import SquareButton from "~/components/base/input/SquareButton.vue";
import TokenAmountInput from "~/components/base/input/TokenAmountInput.vue";
import Button from "~/components/base/input/Button.vue";
import { useSwapperStore } from "~/store/swapper.store";
import { useModalStore } from "~/store/layout/modal.store";
import SwapperSettingsModal from "~/components/swap/modal/SwapperSettingsModal.vue";
import { usePool } from "~/composables/pools/use-pool.composable";
import { useSwapperFactory } from "~/composables/pools/use-swapper.composable";
import { BigNumber, ethers } from "ethers";
import { tickToPrice } from "~/utils/function/tick.function";
import { useErc20Factory } from "~/composables/token/use-erc20.composable";
import { fromReadableAmount } from "~/utils/function/token.function";
import { useAppKitAccount } from "@reown/appkit/vue";
import { useQuoterApi } from "~/composables/api/quoter-api.composable";
import { useProvider } from "~/composables/web3/use-provider.composable";
import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";

const toast = useToast();
const { $modal } = useNuxtApp();
const runtimeConfig = useRuntimeConfig();
const account = useAppKitAccount();
const store = useSwapperStore();
const erc20Factory = useErc20Factory();
const modalStore = useModalStore();
const swapperFactory = useSwapperFactory();
const quoterApi = useQuoterApi();
const pool = ref<ReturnType<typeof usePool>>();
const provider = useProvider();
const swapper = ref<ReturnType<typeof swapperFactory.construct>>();

const openSettings = () => {
  modalStore.open(SwapperSettingsModal);
};

const invertTokens = () => {
  const tmp = store.state.model0.currency;
  store.state.model0.currency = store.state.model1.currency;
  store.state.model1.currency = tmp;

  const tmpAmount = store.state.model0.amount;
  store.state.model0.amount = store.state.model1.amount;
  store.state.model1.amount = tmpAmount;
};

const swap = async () => {
  if (!swapper.value) return;

  if (!account.value.isConnected) return $modal.open();

  const token0 = erc20Factory.construct(store.state.model0.currency.address!);

  let hash = undefined;
  const tokenInDecimals = store.state.model0.currency.decimals;
  const tokenOutDecimals = store.state.model1.currency.decimals;

  store.state.loading = true;
  try {
    await token0.approve(
      runtimeConfig.public.routerAddress,
      fromReadableAmount(
        store.state.model0.amount!.toString(),
        tokenInDecimals,
      ),
    );

    if (store.state.mode === "quoteIn") {
      const amountOutMinimum =
        store.state.model1.amount! * (1 - store.state.slippageTolerance);
      const response = await swapper.value.swapExactInputSingle({
        tokenIn: store.state.model0.currency.address!,
        tokenOut: store.state.model1.currency.address!,
        amountIn: store.state.model0.amount!,
        amountOutMinimum,
        tokenInDecimals: tokenInDecimals,
        tokenOutDecimals: tokenOutDecimals,
        slippage: store.state.slippageTolerance,
        deadline: BigNumber.from(Date.now())
          .div(1000)
          .add(store.state.deadline),
      });

      if (!response) return;

      hash = response.hash;
    } else if (store.state.mode === "quoteOut") {
      const amountInMaximum =
        store.state.model0.amount! * (1 + store.state.slippageTolerance);
      const response = await swapper.value.swapExactOutputSingle({
        tokenIn: store.state.model0.currency.address!,
        tokenOut: store.state.model1.currency.address!,
        amountOut: store.state.model1.amount!,
        amountInMaximum,
        tokenInDecimals: tokenInDecimals,
        tokenOutDecimals: tokenOutDecimals,
        slippage: store.state.slippageTolerance,
        deadline: BigNumber.from(Date.now())
          .div(1000)
          .add(store.state.deadline),
      });

      if (!response) return;

      hash = response.hash;
    }

    toast.add({
      color: "success",
      title: "Swap completed",
      description: `Transaction hash: ${hash}`,
    });
  } catch (e: any) {
    console.log(e);
    toast.add({
      color: "error",
      title: "An error occurred while swapping.",
      description: e.reason,
    });
  } finally {
    store.state.loading = false;
  }
};

const quoteInUpdate = async () => {
  if (!store.state.model0.amount) {
    store.state.model1.amount = 0;
    return;
  }

  store.setMode("quoteIn");

  store.state.model1Loading = true;

  try {
    const response = await quoterApi.getQuote({
      tokenIn: store.state.model0.currency.address!,
      tokenOut: store.state.model1.currency.address!,
      amountIn: fromReadableAmount(
        store.state.model0.amount!.toString(),
        store.state.model0.currency.decimals,
      ),
      mode: "exactInput",
    });

    store.state.pricePerToken0 = tickToPrice(response.pool.tick);
    store.state.poolFee = response.pool.fee;

    store.state.model1.amount = parseFloat(
      ethers.utils.formatUnits(
        response.amountOut,
        store.state.model1.currency.decimals,
      ),
    );

    const pool = usePool(response.pool.address, provider);
    swapper.value = swapperFactory.construct(pool);
  } catch (e: any) {
    toast.add({
      color: "error",
      title: "An error occurred while fetching the quote.",
      description: e.data.message,
    });
  } finally {
    store.state.model1Loading = false;
  }
};

const quoteOutUpdate = async () => {
  if (!store.state.model1.amount) {
    store.state.model0.amount = 0;
    return;
  }

  store.setMode("quoteIn");

  store.state.model0Loading = true;

  try {
    const response = await quoterApi.getQuote({
      tokenIn: store.state.model0.currency.address!,
      tokenOut: store.state.model1.currency.address!,
      amountOut: fromReadableAmount(
        store.state.model1.amount!.toString(),
        store.state.model1.currency.decimals,
      ),
      mode: "exactOutput",
    });

    store.state.pricePerToken0 = tickToPrice(response.pool.tick);
    store.state.poolFee = response.pool.fee;

    store.state.model0.amount = parseFloat(
      ethers.utils.formatUnits(
        response.amountIn,
        store.state.model0.currency.decimals,
      ),
    );

    const pool = usePool(response.pool.address, provider);
    swapper.value = swapperFactory.construct(pool);
  } catch (e: any) {
    toast.add({
      color: "error",
      title: "An error occurred while fetching the quote.",
      description: e.message,
    });
  } finally {
    store.state.model0Loading = false;
  }
};

const onCurrencyChange = async (
  mode: "quoteIn" | "quoteOut",
  old: Hrc20Entity,
) => {
  const address0 = store.state.model0.currency.address;
  const address1 = store.state.model1.currency.address;

  if (address1 === address0) {
    if (mode === "quoteIn") {
      store.state.model1.currency = old;
    } else if (mode === "quoteOut") {
      store.state.model0.currency = old;
    }

    const tmpAmount = store.state.model0.amount;
    store.state.model0.amount = store.state.model1.amount;
    store.state.model1.amount = tmpAmount;
  }

  // await initPool();

  if (mode === "quoteIn") {
    await quoteInUpdate();
  } else if (mode === "quoteOut") {
    await quoteOutUpdate();
  }
};

const onAmountChange = async (mode: "quoteIn" | "quoteOut") => {
  if (mode === "quoteIn") {
    await quoteInUpdate();
  } else if (mode === "quoteOut") {
    await quoteOutUpdate();
  }
};

const isDisabled = computed(() => {
  return (
    !store.state.model0.amount ||
    !store.state.model1.amount ||
    store.state.model1Loading ||
    store.state.model0Loading
  );
});
</script>

<template>
  <Card class="max-w-[28rem] w-full">
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2 justify-between text-lg font-medium">
        <p>Swap</p>
        <SquareButton @click="openSettings">
          <Icon name="lucide:settings" />
        </SquareButton>
      </div>
      <TokenAmountInput
        v-model="store.state.model0"
        :loading="store.state.model0Loading"
        @update-amount="onAmountChange('quoteIn')"
        @update-currency="onCurrencyChange('quoteIn', $event)"
      >
        From
      </TokenAmountInput>
      <button
        class="flex items-center justify-center -my-6 relative cursor-pointer z-10"
        @click="invertTokens"
      >
        <div
          class="rounded-full aspect-square w-10 gap-2 grid place-items-center bg-gradient-to-r from-yellow-500 to-orange-500"
        >
          <Icon name="lucide:arrow-down" />
        </div>
      </button>
      <TokenAmountInput
        v-model="store.state.model1"
        :loading="store.state.model1Loading"
        @update-amount="onAmountChange('quoteOut')"
        @update-currency="onCurrencyChange('quoteOut', $event)"
      >
        To
      </TokenAmountInput>
      <SwapSummary />
      <Button
        :disabled="isDisabled"
        :loading="store.state.loading"
        @click="swap"
      >
        Swap
      </Button>
    </div>
  </Card>
</template>

<style scoped></style>
