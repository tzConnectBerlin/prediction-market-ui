import { WalletType, NetworkType } from '../interfaces/wallet';

const toWalletNetworkType = (network: NetworkType, walletType: WalletType): string => {
  if (walletType === 'Beacon' && network === 'sandbox') return 'CUSTOM';
  if (walletType === 'Beacon') return network.toUpperCase();
  return network;
};
