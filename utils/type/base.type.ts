export type InlineInputOption<T = string | number> = {
  label: string;
  value: T;
};

export type TokenCurrency = {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
  popular?: boolean;
  logoURI?: string;
};

export type TabListItem = {
  label: string;
  value: string;
};

export type TokenAmountModel = {
  currency: TokenCurrency;
  amount?: number;
};

export type Pool = {
  id: string;
  token0: TokenCurrency;
  token1: TokenCurrency;
  fee: number;
  tvl: number;
  apr: number;
  volume24h: number;
  isNew?: boolean;
  createdAt: Date;
};
