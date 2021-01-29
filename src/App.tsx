import React, { Suspense, useEffect, useState } from 'react';
import { LocalizationProvider } from '@material-ui/pickers';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from 'react-toast-notifications';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { AppRouter } from './router';
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
import { getBeaconInstance, isWalletConnected } from './wallet';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [wallet, setWallet] = useState<Partial<WalletInterface>>({});
  const checkWalletConnection = async () => {
    const prevUsedWallet = isWalletConnected();
    if (prevUsedWallet) {
      const walletData = await getBeaconInstance(APP_NAME, true, NETWORK);
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
        <QueryClientProvider client={queryClient}>
          <WalletProvider value={{ wallet, setWallet }}>
            <LocalizationProvider dateAdapter={DateFnsUtils}>
              <ToastProvider>
                <AppRouter />
              </ToastProvider>
            </LocalizationProvider>
          </WalletProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </Suspense>
  );
};

export default App;
