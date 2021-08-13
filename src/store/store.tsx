import create from 'zustand';

export interface StoreState {
  pendingMarketIds: number[];
  filter: number;
  sort: number;
  setFilter: (filter: number) => void;
  setSort: (filter: number) => void;
  setPendingMarketIds: (ids: number[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  pendingMarketIds: [],
  filter: 0,
  sort: 0,
  setFilter: (filter) => set(() => ({ filter })),
  setSort: (sort) => set(() => ({ sort })),
  setPendingMarketIds: (ids: number[]) => set(() => ({ pendingMarketIds: ids })),
}));
