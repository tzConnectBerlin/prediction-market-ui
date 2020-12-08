import { useContext } from 'react';
import WalletContext from './walletContext';

export const useWallet = (): any => {
  const wallet = useContext(WalletContext);
  return wallet;
};
