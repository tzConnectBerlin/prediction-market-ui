import create from 'zustand';

export interface StoreState {
  pendingMarkets: number;
  previousMarketCount: number;
  incrementMarket: () => void;
  decrementMarket: () => void;
  setPreviousMarketCount: (count: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  previousMarketCount: 0,
  pendingMarkets: 0,
  setPreviousMarketCount: (count: number) => set(() => ({ previousMarketCount: count })),
  incrementMarket: () => set((state) => ({ pendingMarkets: state.pendingMarkets + 1 })),
  decrementMarket: () =>
    set((state) => ({
      pendingMarkets: state.pendingMarkets > 0 ? state.pendingMarkets - 1 : 0,
    })),
}));
