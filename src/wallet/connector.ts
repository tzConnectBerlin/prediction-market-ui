import { BeaconWallet } from '@taquito/beacon-wallet';
import { getBeaconInstance, disconnectBeacon } from './beacon';
import { getThanosInstance, disconnectThanos } from './thanos';
import { normalizeNetworkType } from './utils';
import { WalletType, NetworkType, WalletInterface } from '../interfaces/wallet';

export const connectWallet = async (
  name: string,
  network: NetworkType,
  walletType: WalletType,
  connect = true,
): Promise<WalletInterface | undefined> => {
  const networkType = normalizeNetworkType(network, walletType);
  if (walletType === 'Beacon') return getBeaconInstance(name, connect, networkType);
  if (walletType === 'Thanos') return getThanosInstance(name, connect, networkType);
};

export const disconnectWallet = async (wallet: Partial<WalletInterface>): Promise<void> => {
  if (wallet?.type === 'Beacon') return disconnectBeacon(wallet?.wallet as BeaconWallet);
  if (wallet?.type === 'Thanos') return disconnectThanos();
};
