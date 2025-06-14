// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxt/ui",
    "@vueuse/nuxt",
  ],

  runtimeConfig: {
    public: {
      rpcUrl: process.env.NUXT_PUBLIC_RPC_URL,
      chainId: process.env.NUXT_PUBLIC_CHAIN_ID,

      solariSwapAddress: process.env.NUXT_PUBLIC_SOLARI_SWAP_ADDRESS,
      quoterAddress: process.env.NUXT_PUBLIC_QUOTER_ADDRESS,
      factoryAddress: process.env.NUXT_PUBLIC_FACTORY_ADDRESS,
      routerAddress: process.env.NUXT_PUBLIC_ROUTER_ADDRESS,
    },
  },

  nitro: {
    preset: "netlify",
  },

  css: [
    "~/assets/css/fonts.css",
    "~/assets/css/tailwind.css",
    "~/assets/css/colors.css",
    "~/assets/css/main.css",
  ],

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700, 800, 900],
    },
  },

  vite: {
    define: { global: "globalThis" },
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["ethers"],
      esbuildOptions: {
        define: { global: "globalThis" },
        plugins: [
          NodeGlobalsPolyfillPlugin({ process: true, buffer: true }),
          NodeModulesPolyfillPlugin(),
        ],
      },
    },
  },
});
