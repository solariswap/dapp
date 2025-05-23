type ModalStoreState = {
  props?: Record<string, unknown>;
};

export const useModalStore = defineStore("modalStore", () => {
  const state = ref<ModalStoreState>({});
  const component = shallowRef<object>();

  const close = () => {
    component.value = undefined;
  };

  const open = (comp: object, props?: Record<string, unknown>) => {
    component.value = comp;
    state.value.props = props;
  };

  return {
    component,
    state,
    close,
    open,
  };
});
