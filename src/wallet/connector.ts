import { getBeaconInstance } from './beacon';
import { getThanosInstance } from './thanos';
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
