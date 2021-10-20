import { SetState } from 'zustand';
import { triggerTorusLogin } from '../utils/misc';

export interface WalletState {
  connected?: boolean;
  secretKey?: string | null;
  activeAccount: {
    address?: string;
  };
  disconnect: () => void;
  connect: (secretKey?: string, activeAccount?: string) => void;
}

export const createWalletSlice = (set: SetState<any>) => ({
  connected: false,
  activeAccount: { address: '' },
  disconnect: () =>
    set(() => ({ secretKey: null, activeAccount: { address: undefined }, connected: false })),
  connect: (secretKey?: string, address?: string) => {
    if (secretKey && address) {
      set(() => ({ secretKey, activeAccount: { address }, connected: true }));
    } else {
      triggerTorusLogin();
    }
  },
});
