<script setup lang="ts">
import Logo from "~/components/base/Logo.vue";
import SquareButton from "~/components/base/input/SquareButton.vue";
import PrimaryLink from "~/components/layout/PrimaryLink.vue";
import Form from "~/components/base/form/Form.vue";
import FormInput from "~/components/base/form/FormInput.vue";
import TextInput from "~/components/base/input/TextInput.vue";
import Button from "~/components/base/input/Button.vue";

const config = useAppConfig();

const socials = [
  { icon: "mdi:twitter", href: "https://x.com/solari_swap" },
  { icon: "mdi:github", href: "https://github.com/solariswap" },
  { icon: "mdi:telegram", href: "#" },
];

const categories = [
  {
    name: "Product",
    links: [
      { name: "Token Swap", href: "/" },
      { name: "Liquidity Pools", href: "/pools" },
      { name: "Yield Farming", href: "#" },
      { name: "Analytics", href: "#" },
    ],
  },
  {
    name: "Resources",
    links: [
      { name: "Help Center", href: "#" },
      { name: "User Guide", href: "#" },
      { name: "Whitepaper", href: "#" },
      { name: "Security Audits", href: "#" },
      { name: "Brand Assets", href: "#" },
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
            The next-generation decentralized exchange built on cutting-edge
            technology. Swap tokens instantly with minimal fees and maximum
            security.
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
            <Button>Subscribe</Button>
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
