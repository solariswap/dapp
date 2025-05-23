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
