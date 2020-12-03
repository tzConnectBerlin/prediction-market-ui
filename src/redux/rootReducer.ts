import { combineReducers } from '@reduxjs/toolkit';
/**
 * import slices and add the reducer to combine reducer
 */

const rootReducer = combineReducers({});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
