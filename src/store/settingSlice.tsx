import { SetState } from 'zustand';

export interface SettingState {
  advanced: boolean;
  slippage: number;
  deadline: number;
  setAdvanced: (advanced: boolean) => void;
  setSlippage: (slippage: number) => void;
  setDeadline: (deadline: number) => void;
  setSettings: (advanced: boolean, slippage: number, deadline: number) => void;
}

export const createSettingSlice = (set: SetState<any>) => ({
  advanced: false,
  slippage: 5,
  deadline: 30,
  setAdvanced: (advanced: boolean) => set(() => ({ advanced })),
  setSlippage: (slippage: number) => set(() => ({ slippage })),
  setDeadline: (deadline: number) => set(() => ({ deadline })),
  setSettings: (advanced: boolean, slippage: number, deadline: number) =>
    set(() => ({ advanced, slippage, deadline })),
});
