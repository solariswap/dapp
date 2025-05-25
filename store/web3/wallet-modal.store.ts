export const useWalletModalStore = defineStore("walletModalStore", () => {
  const opened = ref(false);

  const setOpened = (value: boolean) => {
    opened.value = value;
  };

  return {
    setOpened,

    opened: readonly(opened),
  };
});
