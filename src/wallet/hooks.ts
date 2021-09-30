import { useBeaconWallet, useWallet } from '@tezos-contrib/react-wallet-provider';
import { TORUS_ENABLED } from '../globals';
import { useStore } from '../store/store';

const useMockBeaconWallet = () => {
  return undefined;
};

export const useConditionalWallet = TORUS_ENABLED ? useStore : useWallet;
export const useConditionalBeaconWallet = TORUS_ENABLED ? useMockBeaconWallet : useBeaconWallet;
