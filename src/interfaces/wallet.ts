import { ThanosDAppNetwork, ThanosWallet } from '@thanos-wallet/dapp';
import { BeaconWallet } from '@taquito/beacon-wallet';

export type WalletType = 'Thanos' | 'Beacon';
export type NetworkType = 'mainnet' | 'delphinet' | 'carthagenet' | 'sandbox';

export type ThanosNetworkType = Exclude<ThanosDAppNetwork, { rpc: string; name: string }>;

export type WalletInstanceType = ThanosWallet | BeaconWallet;

export interface WalletInterface {
  type: WalletType;
  pkh?: string;
  wallet: WalletInstanceType;
  network?: string;
}

export interface IWalletContext {
  wallet: Partial<WalletInterface>;
  setWallet: (wallet: Partial<WalletInterface>) => void;
}
