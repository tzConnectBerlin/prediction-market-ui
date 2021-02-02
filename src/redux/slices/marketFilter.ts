import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketFilter } from '../../interfaces';

type FilterState = MarketFilter;

const initialState: FilterState = {
  auctions: true,
  allMarkets: false,
  openMarkets: true,
  closedMarkets: false,
  onlyMyMarkets: false,
};

export const filterSlice = createSlice({
  name: 'marketFilter',
  initialState,
  reducers: {
    toggleAuctions: (state, action: PayloadAction<boolean>) => {
      state.auctions = action.payload;
    },
    toggleAllMarkets: (state, action: PayloadAction<boolean>) => {
      state.allMarkets = action.payload;
      state.openMarkets = action.payload;
      state.closedMarkets = action.payload;
    },
    toggleOpenMarkets: (state, action: PayloadAction<boolean>) => {
      state.openMarkets = action.payload;
      if ((action.payload && state.closedMarkets) || !action.payload) {
        state.allMarkets = action.payload;
      }
    },
    toggleClosedMarkets: (state, action: PayloadAction<boolean>) => {
      state.closedMarkets = action.payload;
      if ((action.payload && state.openMarkets) || !action.payload) {
        state.allMarkets = action.payload;
      }
    },
    toggleOnlyMyMarkets: (state, action: PayloadAction<boolean>) => {
      state.onlyMyMarkets = action.payload;
    },
  },
});
