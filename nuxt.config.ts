// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@pinia/nuxt"],

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
