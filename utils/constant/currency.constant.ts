import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";

export const currencies: Hrc20Entity[] = [
  {
    name: "WETH",
    symbol: "WETH",
    address: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
    decimals: 18,
    popular: true,
    logoUri: "/images/token/HLS.jpg",
  },
  {
    name: "KRK Token",
    symbol: "KRK",
    address: "0x70e74Fc032B0c4A0D90110ED0147D57dbd4E5F4e",
    decimals: 18,
    popular: false,
  },
  {
    name: "LRL Token",
    symbol: "LRL",
    address: "0x13661651c5EF06A7cF7b76A9F0a72f2d6C4E311A",
    decimals: 18,
    popular: false,
  },
  {
    name: "Okay Token",
    symbol: "OKAY",
    address: "0x56D43709A3463998Aac95683cE308eb3dCD3BE52",
    decimals: 18,
    popular: false,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0x00002",
    decimals: 18,
    popular: true,
    logoUri:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/512px-Ethereum_logo_2014.svg.png",
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    address: "0x00003",
    decimals: 18,
    popular: true,
    logoUri:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  },
  {
    name: "Solana",
    symbol: "SOL",
    address: "0x00004",
    decimals: 18,
    popular: true,
    logoUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIsJL3zRgUrkD3yE3lD7LK0wZWSiRyY1GVg&s",
  },
  {
    name: "XRP",
    symbol: "XRP",
    address: "0x00005",
    decimals: 18,
    popular: false,
    logoUri: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
  },
  {
    name: "BNB",
    symbol: "BNB",
    address: "0x00006",
    decimals: 18,
    popular: false,
    logoUri: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    address: "0x00007",
    decimals: 18,
    popular: false,
    logoUri: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    address: "0x00008",
    decimals: 18,
    popular: false,
    logoUri: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
  },
];
