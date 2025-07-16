<script setup lang="ts">
import Logo from "~/components/base/Logo.vue";
import SquareButton from "~/components/base/input/SquareButton.vue";
import PrimaryLink from "~/components/layout/PrimaryLink.vue";
import Form from "~/components/base/form/Form.vue";
import FormInput from "~/components/base/form/FormInput.vue";
import TextInput from "~/components/base/input/TextInput.vue";
import Button from "~/components/base/input/Button.vue";
import Tick from "~/components/layout/Tick.vue";

const config = useAppConfig();

const socials = [
  { icon: "mdi:twitter", href: "https://x.com/solari_swap" },
  { icon: "mdi:github", href: "https://github.com/solariswap" },
  { icon: "mdi:telegram", href: "https://t.me/solariswap" },
  { icon: "mdi:discord", href: "https://discord.gg/NHn24QC3gu" },
];

const categories: {
  name: string;
  links: { name: string; href: string; tick?: string }[];
}[] = [
  {
    name: "Product",
    links: [
      { name: "Token Swap", href: "/" },
      { name: "Liquidity Pools", href: "/pools" },
      { name: "Yield Farming", href: "#", tick: "Soon" },
      { name: "Analytics", href: "#", tick: "Soon" },
    ],
  },
  {
    name: "Resources",
    links: [
      { name: "Help Center", href: "https://discord.gg/JYA2PaP6br" },
      { name: "User Guide", href: "https://docs.solariswap.finance" },
      {
        name: "Whitepaper",
        href: "https://whitepaper.solariswap.finance",
        tick: "Soon",
      },
      { name: "Security Audits", href: "#", tick: "Soon" },
      {
        name: "Brand Assets",
        href: "https://drive.google.com/drive/folders/1YScwg6edzOMvtVEDoMFZt_rF62mbN0l7?usp=sharing",
      },
    ],
  },
];

const year = new Date().getFullYear();

const goTo = (social: { href: string }) => {
  window.open(social.href, "_blank");
};
</script>

<template>
  <div class="py-14 laptop:py-md bg-background border-border border-t">
    <div class="max-w-desktop mx-auto px-md">
      <div class="grid laptop:grid-cols-4 gap-md">
        <div class="flex flex-col gap-4">
          <Logo />
          <p class="text-muted-foreground text-sm font-medium leading-relaxed">
            First native DEX on Helios
          </p>
          <div class="flex items-center gap-sm">
            <SquareButton
              v-for="social in socials"
              :key="social.icon"
              type="outline"
              @click="goTo(social)"
            >
              <Icon :name="social.icon" />
            </SquareButton>
          </div>
        </div>
        <div
          v-for="category in categories"
          :key="`cat-${category.name}`"
          class="flex flex-col"
        >
          <div class="font-semibold text-lg">{{ category.name }}</div>
          <ul class="mt-4 flex flex-col gap-2 font-medium">
            <li
              v-for="link in category.links"
              :key="`${category.name}-${link.name}`"
            >
              <PrimaryLink :to="link.href" target="_blank">
                {{ link.name }}
                <Tick v-if="link.tick" type="warning">{{ link.tick }}</Tick>
              </PrimaryLink>
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-2">
          <p class="font-semibold text-lg">Stay Updated</p>
          <p class="mt-2 text-sm text-muted-foreground">
            Get the latest updates on new features, partnerships, and market
            insights.
          </p>
          <Form>
            <FormInput>
              <TextInput
                icon="mdi:email"
                type="email"
                placeholder="Enter your mail"
              />
            </FormInput>
            <Button>Subscribe (soon)</Button>
          </Form>
          <p class="mt-2 text-muted-foreground text-xs">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates from our team.
          </p>
        </div>
      </div>
      <div
        class="mt-12 border-border border-t pt-8 text-muted-foreground text-sm"
      >
        <div
          class="flex flex-col laptop:flex-row justify-between items-center gap-4"
        >
          <p>© {{ year }} SolariSwap. All rights reserved.</p>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <div
                class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
              ></div>
              <p>All systems operational</p>
            </div>
            <p>Version {{ config.version }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
