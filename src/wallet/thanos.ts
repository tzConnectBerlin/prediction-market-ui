import { ThanosWallet } from '@thanos-wallet/dapp';
import { WalletInterface, ThanosNetworkType } from '../interfaces/wallet';
import { setWalletType } from './utils';

const walletConnect = async (wallet: ThanosWallet, network: ThanosNetworkType = 'delphinet') => {
  try {
    await wallet.connect(network);
  } catch (error) {
    console.log(error);
  }
};

export const getThanosInstance = async (
  name = 'PredictionMarket',
  connect = false,
  network: ThanosNetworkType = 'delphinet',
): Promise<WalletInterface | undefined> => {
  try {
    const available: boolean = await ThanosWallet.isAvailable();
    if (!available) {
      throw new Error('Thanos Wallet not installed');
    }
    const wallet = new ThanosWallet(name);
    connect && (await walletConnect(wallet, network));
    setWalletType('Thanos');
    return {
      type: 'Thanos',
      wallet,
      network,
      pkh: connect ? await wallet.getPKH() : undefined,
    };
  } catch (error) {
    console.log(error);
  }
};
