import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType as BeaconNetworkType } from '@airgap/beacon-sdk';
import { WalletInterface } from '../interfaces/wallet';

const walletConnect = async (
  wallet: BeaconWallet,
  network: BeaconNetworkType = BeaconNetworkType.DELPHINET,
) => {
  try {
    await wallet.requestPermissions({ network: { type: network } });
  } catch (error) {
    console.log(error);
  }
};

const getWalletInstance = async (
  name = 'PredictionMarket',
  connect = false,
  network: BeaconNetworkType = BeaconNetworkType.DELPHINET,
): Promise<WalletInterface | undefined> => {
  try {
    const wallet = new BeaconWallet({ name });
    connect && (await walletConnect(wallet, network));
    return {
      type: 'Beacon',
      wallet,
      network,
      pkh: connect ? await wallet.getPKH() : undefined,
    };
  } catch (error) {
    console.log(error);
  }
};
