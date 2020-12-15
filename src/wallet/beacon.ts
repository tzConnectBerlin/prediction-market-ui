import { BeaconWallet } from '@taquito/beacon-wallet';
import { BeaconMessageType, NetworkType } from '@airgap/beacon-sdk';
import { WalletInterface } from '../interfaces/wallet';
import { setWalletType } from './utils';

const walletConnect = async (
  wallet: BeaconWallet,
  network: NetworkType = NetworkType.DELPHINET,
) => {
  try {
    await wallet.requestPermissions({ network: { type: network } });
  } catch (error) {
    console.log(error);
  }
};

export const getBeaconInstance = async (
  name = 'PredictionMarket',
  connect = false,
  network = 'delphinet',
): Promise<WalletInterface | undefined> => {
  try {
    const wallet = new BeaconWallet({ name });
    const activeAccount = await wallet.client.getActiveAccount();
    const opsRequest = activeAccount
      ? await wallet.client.checkPermissions(BeaconMessageType.OperationRequest)
      : undefined;
    const signRequest = activeAccount
      ? await wallet.client.checkPermissions(BeaconMessageType.SignPayloadRequest)
      : undefined;
    const networkType: NetworkType = NetworkType[network as keyof typeof NetworkType];
    connect && !opsRequest && !signRequest && (await walletConnect(wallet, networkType));
    setWalletType('Beacon');
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

export const disconnectBeacon = async (wallet: BeaconWallet): Promise<void> => {
  setWalletType(null);
  await wallet.disconnect();
};
