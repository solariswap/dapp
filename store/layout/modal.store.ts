export const useModalStore = defineStore("modalStore", () => {
  const props = shallowRef<Record<string, unknown>>();
  const component = shallowRef<object>();

  const close = () => {
    component.value = undefined;
  };

  const open = (comp: object, properties?: Record<string, unknown>) => {
    component.value = comp;
    props.value = properties;
  };

  const opened = computed(() => !!component.value);

  return {
    component,
    props,
    close,
    open,
    opened,
  };
});
