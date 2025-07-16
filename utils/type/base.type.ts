import type { Hrc20Entity } from "~/utils/type/entity/hrc20-entity.type";

export type InlineInputOption<T = string | number> = {
  label: string;
  value: T;
};

export type TabListItem = {
  label: string;
  value: string;
};

export type TokenAmountModel = {
  currency: Hrc20Entity;
  amount?: number;
};

export type StatsCard = {
  name: string;
  value: string;
  footer: string;
  direction: "down" | "up";
  tick?: string;
  class: string;
  titleClass: string;
};

export type Pool = {
  id: string;
  token0: Hrc20Entity;
  token1: Hrc20Entity;
  fee: number;
  tvl: number;
  apr: number;
  volume24h: number;
  isNew?: boolean;
  createdAt: Date;
};
