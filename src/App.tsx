import React, { Suspense, useEffect } from 'react';
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
import { initIPFSClient } from './ipfs/ipfs';
import {
  initTezos,
  initMarketContract,
  initFA12Contract,
  setWalletProvider,
} from './contracts/Market';
import {
  RPC_URL,
  RPC_PORT,
  IPFS_API,
  IPFS_PORT,
  MARKET_ADDRESS,
  FA12_CONTRACT,
  NETWORK,
  APP_NAME,
} from './utils/globals';
import { Loading } from './design-system/atoms/Loading';
import { WalletProvider } from './wallet/walletContext';
import { WalletInterface } from './interfaces';
import { isWalletConnected, getBeaconInstance } from './wallet';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [theme] = React.useState(lightTheme);
  const [wallet, setWallet] = React.useState<Partial<WalletInterface>>({});
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
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <Global styles={GlobalStyle(theme)} />
            <ThemeProvider theme={theme}>
              <ToastProvider placement="bottom-right">
                <WalletProvider value={{ wallet, setWallet }}>
                  <AppRouter />
                </WalletProvider>
              </ToastProvider>
            </ThemeProvider>
          </LocalizationProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </Suspense>
  );
};

export default App;
