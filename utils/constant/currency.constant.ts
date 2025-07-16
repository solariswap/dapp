import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";

export const currencies: Hrc20Entity[] = [
  {
    name: "HLS",
    symbol: "HLS",
    address: "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517",
    decimals: 18,
    popular: true,
    logoUri: "/images/token/HLS.jpg",
  },
  {
    name: "WETH",
    symbol: "WETH",
    address: "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd",
    decimals: 18,
    popular: true,
    logoUri:
      "https://testnet1-cdn.helioschainlabs.org/hash/45fa0204dcbb461f9899168a8b56162ecc832919b0c8b81b85f7de2abba408aa",
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
