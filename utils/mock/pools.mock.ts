import type { Pool } from "~/utils/type/base.type";

export const mockPools: Pool[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    token0: {
      name: "Helios",
      symbol: "HLS",
      address: "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517",
      decimals: 18,
      popular: true,
      logoURI: "/images/token/HLS.jpg",
    },
    token1: {
      name: "KRK Token",
      symbol: "KRK",
      address: "0xdcCe0c02C1e010b3e7F08225108fC9F026A75183",
      decimals: 18,
      popular: false,
    },
    fee: 300,
    tvl: 45600000,
    apr: 12.5,
    volume24h: 2800000,
    isNew: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174000",
    token0: {
      name: "Bitcoin",
      symbol: "BTC",
      logoURI:
        "https://kzmgd3ogr07gswfw24vn.lite.vusercontent.net/placeholder.svg?height=32&width=32",
      decimals: 18,
      address: "0x0000003",
    },
    token1: {
      name: "Ethereum",
      symbol: "ETH",
      logoURI:
        "https://kzmgd3ogr07gswfw24vn.lite.vusercontent.net/placeholder.svg?height=32&width=32",
      decimals: 18,
      address: "0x0000003",
    },
    fee: 300,
    tvl: 38200000,
    apr: 8.7,
    volume24h: 1950000,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174000",
    token0: {
      name: "USD Coin",
      symbol: "USDC",
      logoURI:
        "https://kzmgd3ogr07gswfw24vn.lite.vusercontent.net/placeholder.svg?height=32&width=32",
      decimals: 18,
      address: "0x0000003",
    },
    token1: {
      name: "Tether",
      symbol: "USDT",
      logoURI:
        "https://kzmgd3ogr07gswfw24vn.lite.vusercontent.net/placeholder.svg?height=32&width=32",
      decimals: 18,
      address: "0x0000003",
    },
    fee: 300,
    tvl: 28900000,
    apr: 3.2,
    volume24h: 5200000,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "423e4567-e89b-12d3-a456-426614174000",
    token0: {
      name: "Solana",
      symbol: "SOL",
      logoURI:
        "https://kzmgd3ogr07gswfw24vn.lite.vusercontent.net/placeholder.svg?height=32&width=32",
      decimals: 18,
      address: "0x0000003",
    },
    token1: {
      name: "USD Coin",
      symbol: "USDC",
      logoURI:
        "https://kzmgd3ogr07gswfw24vn.lite.vusercontent.net/placeholder.svg?height=32&width=32",
      decimals: 18,
      address: "0x0000003",
    },
    fee: 300,
    tvl: 15600000,
    apr: 18.9,
    volume24h: 890000,
    isNew: true,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "523e4567-e89b-12d3-a456-426614174000",
    token0: {
      name: "Chainlink",
      symbol: "LINK",
      logoURI:
        "https://kzmgd3ogr07gswfw24vn.lite.vusercontent.net/placeholder.svg?height=32&width=32",
      decimals: 18,
      address: "0x0000003",
    },
    token1: {
      name: "Ethereum",
      symbol: "ETH",
      logoURI:
        "https://kzmgd3ogr07gswfw24vn.lite.vusercontent.net/placeholder.svg?height=32&width=32",
      decimals: 18,
      address: "0x0000003",
    },
    fee: 300,
    tvl: 8900000,
    apr: 15.3,
    volume24h: 420000,
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "623e4567-e89b-12d3-a456-426614174000",
    token0: {
      name: "Avalanche",
      symbol: "AVAX",
      logoURI:
        "https://kzmgd3ogr07gswfw24vn.lite.vusercontent.net/placeholder.svg?height=32&width=32",
      decimals: 18,
      address: "0x0000003",
    },
    token1: {
      name: "USD Coin",
      symbol: "USDC",
      logoURI:
        "https://kzmgd3ogr07gswfw24vn.lite.vusercontent.net/placeholder.svg?height=32&width=32",
      decimals: 18,
      address: "0x0000003",
    },
    fee: 300,
    tvl: 6700000,
    apr: 22.1,
    volume24h: 310000,
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "723e4567-e89b-12d3-a456-426614174000",
    token0: {
      name: "Polkadot",
      symbol: "DOT",
      logoURI:
        "https://kzmgd3ogr07gswfw24vn.lite.vusercontent.net/placeholder.svg?height=32&width=32",
      decimals: 18,
      address: "0x0000003",
    },
    token1: {
      name: "Ethereum",
      symbol: "ETH",
      logoURI:
        "https://kzmgd3ogr07gswfw24vn.lite.vusercontent.net/placeholder.svg?height=32&width=32",
      decimals: 18,
      address: "0x0000003",
    },
    fee: 300,
    tvl: 4200000,
    apr: 11.8,
    volume24h: 180000,
    createdAt: new Date("2024-01-03"),
  },
  {
    id: "823e4567-e89b-12d3-a456-426614174000",
    token0: {
      name: "Raydium",
      symbol: "RAY",
      logoURI:
        "https://kzmgd3ogr07gswfw24vn.lite.vusercontent.net/placeholder.svg?height=32&width=32",
      decimals: 18,
      address: "0x0000003",
    },
    token1: {
      name: "Solana",
      symbol: "SOL",
      logoURI:
        "https://kzmgd3ogr07gswfw24vn.lite.vusercontent.net/placeholder.svg?height=32&width=32",
      decimals: 18,
      address: "0x0000003",
    },
    fee: 300,
    tvl: 3100000,
    apr: 28.5,
    volume24h: 95000,
    isNew: true,
    createdAt: new Date("2024-01-18"),
  },
];
