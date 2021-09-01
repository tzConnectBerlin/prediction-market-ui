import create from 'zustand';

export interface StoreState {
  advanced: boolean;
  pendingMarketIds: number[];
  filter: number;
  sort: number;
  slippage: number;
  deadline: number;
  setAdvanced: (advanced: boolean) => void;
  setSlippage: (slippage: number) => void;
  setDeadline: (deadline: number) => void;
  setSettings: (advanced: boolean, slippage: number, deadline: number) => void;
  setFilter: (filter: number) => void;
  setSort: (filter: number) => void;
  setPendingMarketIds: (ids: number[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  advanced: false,
  pendingMarketIds: [],
  filter: 0,
  sort: 0,
  slippage: 5,
  deadline: 30,
  setAdvanced: (advanced) => set(() => ({ advanced })),
  setSlippage: (slippage) => set(() => ({ slippage })),
  setDeadline: (deadline) => set(() => ({ deadline })),
  setSettings: (advanced, slippage, deadline) => set(() => ({ advanced, slippage, deadline })),
  setFilter: (filter) => set(() => ({ filter })),
  setSort: (sort) => set(() => ({ sort })),
  setPendingMarketIds: (ids: number[]) => set(() => ({ pendingMarketIds: ids })),
}));
