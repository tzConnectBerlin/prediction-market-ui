import React, { Suspense, useEffect, useState } from 'react';
import { LocalizationProvider } from '@material-ui/lab';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from 'react-toast-notifications';
import DateFnsUtils from '@material-ui/lab/AdapterDateFns';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@material-ui/core';
import { Global } from '@emotion/react';
import { GlobalStyle } from './assets/styles/style';
import { lightTheme } from './theme';
import { AppRouter } from './router';
import { WalletProvider } from './wallet/walletContext';
import { WalletInterface } from './interfaces';
import { initIPFSClient } from './ipfs/ipfs';
import {
  initTezos,
  initMarketContract,
  setWalletProvider,
  initFA12Contract,
} from './contracts/Market';
import {
  APP_NAME,
  NETWORK,
  RPC_URL,
  RPC_PORT,
  IPFS_API,
  IPFS_PORT,
  MARKET_ADDRESS,
  FA12_CONTRACT,
} from './utils/globals';
import { getBeaconInstance, isWalletConnected } from './wallet';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [theme] = React.useState(lightTheme);
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
    initFA12Contract(FA12_CONTRACT);
    checkWalletConnection();
  }, []);

  return (
    <Suspense fallback="Loading...">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <WalletProvider value={{ wallet, setWallet }}>
            <LocalizationProvider dateAdapter={DateFnsUtils}>
              <Global styles={GlobalStyle(theme)} />
              <ThemeProvider theme={theme}>
                <ToastProvider placement="bottom-right">
                  <AppRouter />
                </ToastProvider>
              </ThemeProvider>
            </LocalizationProvider>
          </WalletProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </Suspense>
  );
};

export default App;
