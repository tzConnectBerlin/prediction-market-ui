import { WalletType, NetworkType } from '../interfaces/wallet';

export const normalizeNetworkType = (network: NetworkType, walletType: WalletType): NetworkType => {
  if (walletType === 'Beacon' && network === 'sandbox') return 'CUSTOM' as NetworkType;
  if (walletType === 'Beacon') return network.toUpperCase() as NetworkType;
  return network;
};

export const setWalletType = (walletType: WalletType | null): void => {
  walletType
    ? localStorage.setItem('walletType', walletType)
    : localStorage.removeItem('walletType');
};

export const getWalletType = (): WalletType | null => {
  const walletType = localStorage.getItem('walletType');
  if (walletType !== null) {
    return walletType as WalletType;
  }
  return walletType;
};
