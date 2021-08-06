import create from 'zustand';

export interface StoreState {
  pendingMarkets: number;
  previousMarketCount: number;
  incrementPendingMarket: () => void;
  decrementPendingMarket: () => void;
  setPreviousMarketCount: (count: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  previousMarketCount: 0,
  pendingMarkets: 0,
  setPreviousMarketCount: (count: number) => set(() => ({ previousMarketCount: count })),
  incrementPendingMarket: () => set((state) => ({ pendingMarkets: state.pendingMarkets + 1 })),
  decrementPendingMarket: () =>
    set((state) => ({
      pendingMarkets: state.pendingMarkets > 0 ? state.pendingMarkets - 1 : 0,
    })),
}));
