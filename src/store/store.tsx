import create from 'zustand';
import { createFilterSlice, FilterState } from './filterSlice';
import { createSettingSlice, SettingState } from './settingSlice';
import { createWalletSlice, WalletState } from './walletSlice';

export type StoreState = FilterState & SettingState & WalletState;

export const useStore = create<StoreState>((set) => ({
  ...createFilterSlice(set),
  ...createSettingSlice(set),
  ...createWalletSlice(set),
}));
