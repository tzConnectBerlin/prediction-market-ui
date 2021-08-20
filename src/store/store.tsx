import create from 'zustand';

export interface StoreState {
  pendingMarketIds: number[];
  filter: number;
  sort: number;
  slippage: number;
  deadline: number;
  setSlippage: (slippage: number) => void;
  setDeadline: (deadline: number) => void;
  setSettings: (slippage: number, deadline: number) => void;
  setFilter: (filter: number) => void;
  setSort: (filter: number) => void;
  setPendingMarketIds: (ids: number[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  pendingMarketIds: [],
  filter: 0,
  sort: 0,
  slippage: 5,
  deadline: 30,
  setSlippage: (slippage) => set(() => ({ slippage })),
  setDeadline: (deadline) => set(() => ({ deadline })),
  setSettings: (slippage, deadline) => set(() => ({ deadline, slippage })),
  setFilter: (filter) => set(() => ({ filter })),
  setSort: (sort) => set(() => ({ sort })),
  setPendingMarketIds: (ids: number[]) => set(() => ({ pendingMarketIds: ids })),
}));
