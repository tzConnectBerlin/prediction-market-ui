import create from 'zustand';

export interface StoreState {
  pendingMarketIds: number[];
  setPendingMarketIds: (ids: number[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  pendingMarketIds: [],
  setPendingMarketIds: (ids: number[]) => set(() => ({ pendingMarketIds: ids })),
}));
