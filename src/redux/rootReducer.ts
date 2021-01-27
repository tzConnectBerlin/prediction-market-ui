import { combineReducers } from '@reduxjs/toolkit';
import { filterSlice } from './slices/marketFilter';

const rootReducer = combineReducers({
  marketFilter: filterSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
