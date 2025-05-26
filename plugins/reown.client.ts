import { createAppKit, useAppKit } from "@reown/appkit/vue";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";

export default defineNuxtPlugin(() => {
  const projectId = "ebb0d9046114af26eabfb896c92fe593"; // from cloud.walletconnect.com
  const metadata = {
    name: "SolariSwap",
    description: "DEX on Helios",
    url: "https://solariswap.finance",
    icons: ["https://my-dapp.example.com/icon.png"],
  };

  const heliosChain = {
    id: 42000,
    name: "Helios Testnet",
    network: "helios",
    nativeCurrency: { name: "Helios", symbol: "HLS", decimals: 18 },
    rpcUrls: {
      default: { http: ["https://testnet1.helioschainlabs.org"] },
      public: { http: ["https://testnet1.helioschainlabs.org"] },
    },
    blockExplorers: {
      default: {
        name: "Helios Explorer",
        url: "https://explorer.helioschainlabs.org",
      },
    },
  };

  // Initialize Web3Modal (WalletConnect v2) with ethers.js
  createAppKit({
    adapters: [new Ethers5Adapter()],
    networks: [heliosChain],
    projectId,
    features: {
      analytics: true, // Optional - defaults to your Cloud configuration
      socials: false,
      email: false,
    },
  });

  const modal = useAppKit();

  return { provide: { modal } };
});
