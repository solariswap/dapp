export default defineAppConfig({
  version: "0.0.1 Alpha",
  ui: {
    navigationMenu: {
      slots: {
        root: "relative flex gap-2 [&>div]:min-w-0",
        list: "isolate min-w-0 gap-2",
        label:
          "w-full flex items-center gap-1.5 font-semibold text-3xl laptop:text-lg text-highlighted px-2.5 py-1.5",
        link: "group relative w-full flex items-center gap-1.5 font-medium text-3xl laptop:text-lg before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
      },
      compoundVariants: [
        {
          variant: "pill",
          active: true,
          highlight: false,
          class: {
            linkLeadingIcon: "text-yellow-400",
            link: "before:bg-gradient-to-r before:from-yellow-500/10 before:to-orange-500/10 text-yellow-400 before:border-yellow-500/20 before:border",
          },
        },
      ],
    },
  },
});
