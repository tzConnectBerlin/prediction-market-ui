import create from 'zustand';

export interface StoreState {
  pendingMarkets: number;
  incrementMarket: () => void;
  decrementMarket: () => void;
}

export const useStore = create<StoreState>((set) => ({
  pendingMarkets: 0,
  incrementMarket: () => set((state) => ({ pendingMarkets: state.pendingMarkets + 1 })),
  decrementMarket: () =>
    set((state) => ({
      pendingMarkets: state.pendingMarkets > 0 ? state.pendingMarkets - 1 : 0,
    })),
}));
