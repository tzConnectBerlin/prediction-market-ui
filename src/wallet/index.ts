import { BeaconWallet } from '@taquito/beacon-wallet';
import { BeaconMessageType, NetworkType } from '@airgap/beacon-sdk';
import { WalletInterface } from '../interfaces/wallet';

export const setConnected = (): void => {
  localStorage.setItem('wallet-connected', 'true');
};

export const isWalletConnected = (): boolean => {
  return localStorage.getItem('wallet-connected') === 'true';
};

const connectBeacon = async (
  wallet: BeaconWallet,
  network: NetworkType = NetworkType.FLORENCENET,
) => {
  try {
    await wallet.requestPermissions({
      network: { type: network, name: 'Prediction Market' },
    });
    setConnected();
  } catch (error) {
    console.log(error);
  }
};

export const getBeaconInstance = async (
  name = 'Prediction Market',
  connect = false,
  network: NetworkType = NetworkType.FLORENCENET,
): Promise<WalletInterface | undefined> => {
  try {
    const wallet = new BeaconWallet({ name, preferredNetwork: network });
    const activeAccount = await wallet.client.getActiveAccount();

    const opsRequest = activeAccount
      ? await wallet.client.checkPermissions(BeaconMessageType.OperationRequest)
      : undefined;
    const signRequest = activeAccount
      ? await wallet.client.checkPermissions(BeaconMessageType.SignPayloadRequest)
      : undefined;
    connect && !opsRequest && !signRequest && (await connectBeacon(wallet, network));
    return {
      wallet,
      network,
      pkh: connect ? await wallet.getPKH() : undefined,
    };
  } catch (error) {
    console.log(error);
  }
};

export const disconnectBeacon = async (wallet: BeaconWallet): Promise<void> => {
  localStorage.removeItem('wallet-connected');
  await wallet.disconnect();
};
