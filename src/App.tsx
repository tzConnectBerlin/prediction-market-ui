import React, { Suspense, useEffect, useState } from 'react';
import { LocalizationProvider } from '@material-ui/pickers';
import { HelmetProvider } from 'react-helmet-async';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import './App.css';
import { AppRouter } from './router';
import { connectWallet } from './wallet/connector';
import { getWalletType } from './wallet/utils';
import { WalletProvider } from './wallet/walletContext';
import { WalletInterface } from './interfaces';
import { initIPFSClient } from './ipfs/ipfs';
import { initTezos, initMarketContract, setWalletProvider } from './contracts/Market';
import {
  APP_NAME,
  NETWORK,
  RPC_URL,
  RPC_PORT,
  IPFS_API,
  IPFS_PORT,
  MARKET_ADDRESS,
} from './utils/globals';

const App: React.FC = () => {
  const [wallet, setWallet] = useState<Partial<WalletInterface>>({});
  const checkWalletConnection = async () => {
    const prevUsedWallet = getWalletType();
    if (prevUsedWallet !== null) {
      const walletData = await connectWallet(APP_NAME, NETWORK, prevUsedWallet);
      walletData?.wallet && setWalletProvider(walletData.wallet);
      walletData && setWallet(walletData);
    }
  };

  useEffect(() => {
    initTezos(RPC_URL, RPC_PORT);
    initIPFSClient(IPFS_API, IPFS_PORT);
    initMarketContract(MARKET_ADDRESS);
    checkWalletConnection();
  }, []);

  return (
    <Suspense fallback="Loading...">
      <HelmetProvider>
        <WalletProvider value={{ wallet, setWallet }}>
          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <AppRouter />
          </LocalizationProvider>
        </WalletProvider>
      </HelmetProvider>
    </Suspense>
  );
};

export default App;
