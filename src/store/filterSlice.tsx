import { SetState } from 'zustand';

export interface FilterState {
  pendingMarketIds: number[];
  filter: number;
  sort: number;
  setFilter: (filter: number) => void;
  setSort: (filter: number) => void;
  setPendingMarketIds: (ids: number[]) => void;
}

export const createFilterSlice = (set: SetState<any>) => ({
  pendingMarketIds: [],
  filter: 0,
  sort: 0,
  setFilter: (filter: number) => set(() => ({ filter })),
  setSort: (sort: number) => set(() => ({ sort })),
  setPendingMarketIds: (ids: number[]) => set(() => ({ pendingMarketIds: ids })),
});
