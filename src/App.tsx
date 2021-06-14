import React, { Suspense, useEffect } from 'react';
import { LocalizationProvider } from '@material-ui/lab';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from 'react-toast-notifications';
import DateFnsUtils from '@material-ui/lab/AdapterDateFns';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@material-ui/core';
import { Global } from '@emotion/react';
import { WalletProvider } from '@tz-contrib/react-wallet-provider';
import { GlobalStyle } from './assets/styles/style';
import { lightTheme } from './theme';
import { AppRouter } from './router';
import { initTezos, initMarketContract, initFA12Contract } from './contracts/Market';
import {
  RPC_URL,
  RPC_PORT,
  MARKET_ADDRESS,
  FA12_CONTRACT,
  NETWORK,
  APP_NAME,
} from './utils/globals';
import { Loading } from './design-system/atoms/Loading';
import { tzStatsBlockExplorer } from './utils/TzStatsBlockExplorer';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [theme] = React.useState(lightTheme);

  useEffect(() => {
    initTezos(RPC_URL, RPC_PORT);
    initMarketContract(MARKET_ADDRESS);
    initFA12Contract(FA12_CONTRACT);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <Global styles={GlobalStyle(theme)} />
            <ThemeProvider theme={theme}>
              <ToastProvider placement="bottom-right">
                <WalletProvider
                  name={APP_NAME}
                  network={NETWORK}
                  clientType="taquito"
                  blockExplorer={tzStatsBlockExplorer}
                >
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
