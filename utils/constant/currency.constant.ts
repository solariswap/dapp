import type { TokenCurrency } from "~/utils/type/base.type";

export const currencies: TokenCurrency[] = [
  {
    name: "Helios",
    symbol: "HLS",
    address: "0x00001",
    decimals: 18,
    popular: true,
    logoURI:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/512px-Ethereum_logo_2014.svg.png",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0x00002",
    decimals: 18,
    popular: true,
    logoURI:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/512px-Ethereum_logo_2014.svg.png",
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    address: "0x00003",
    decimals: 18,
    popular: true,
    logoURI:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  },
  {
    name: "Solana",
    symbol: "SOL",
    address: "0x00004",
    decimals: 18,
    popular: true,
    logoURI:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIsJL3zRgUrkD3yE3lD7LK0wZWSiRyY1GVg&s",
  },
  {
    name: "XRP",
    symbol: "XRP",
    address: "0x00005",
    decimals: 18,
    popular: false,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
  },
  {
    name: "BNB",
    symbol: "BNB",
    address: "0x00006",
    decimals: 18,
    popular: false,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    address: "0x00007",
    decimals: 18,
    popular: false,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    address: "0x00008",
    decimals: 18,
    popular: false,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
  },
];
