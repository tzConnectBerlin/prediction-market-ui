import React, { Suspense, useEffect } from 'react';
import { LocalizationProvider } from '@mui/lab';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from 'react-toast-notifications';
import DateFnsUtils from '@mui/lab/AdapterDateFns';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@mui/material';
import { Global } from '@emotion/react';
import { WalletProvider } from '@tezos-contrib/react-wallet-provider';
import { ApolloProvider } from '@apollo/client';
import { GlobalStyle } from './styles/style';
import { lightTheme } from './styles/theme';
import { AppRouter } from './router';
import { initTezos, initMarketContract, initFA12Contract } from './contracts/Market';
import {
  RPC_URL,
  RPC_PORT,
  MARKET_ADDRESS,
  FA12_CONTRACT,
  NETWORK,
  APP_NAME,
  TORUS_ENABLED,
} from './globals';
import { Loading } from './design-system/atoms/Loading';
import { tzStatsBlockExplorer } from './utils/TzStatsBlockExplorer';
import { useStore } from './store/store';
import { getSavedSettings } from './utils/misc';
import { SettingValues } from './interfaces';
import { graphqlClient } from './graphql/client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchInterval: 1000 * 30, staleTime: 1000 * 30 },
  },
});

const defaultSettings: SettingValues = {
  advanced: false,
  deadline: 30,
  maxSlippage: 5,
};

const App: React.FC = () => {
  const { setSettings } = useStore();

  useEffect(() => {
    initTezos(RPC_URL, RPC_PORT);
    initMarketContract(MARKET_ADDRESS);
    initFA12Contract(FA12_CONTRACT);
    const settings = getSavedSettings();
    setSettings(
      settings?.advanced ?? defaultSettings.advanced,
      settings?.maxSlippage ?? defaultSettings.maxSlippage,
      settings?.deadline ?? defaultSettings.deadline,
    );
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <ApolloProvider client={graphqlClient}>
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={DateFnsUtils}>
              <Global styles={GlobalStyle(lightTheme)} />
              <ThemeProvider theme={lightTheme}>
                <ToastProvider placement="bottom-right">
                  {TORUS_ENABLED ? (
                    <AppRouter />
                  ) : (
                    <WalletProvider
                      name={APP_NAME}
                      network={NETWORK}
                      clientType="taquito"
                      blockExplorer={tzStatsBlockExplorer}
                    >
                      <AppRouter />
                    </WalletProvider>
                  )}
                </ToastProvider>
              </ThemeProvider>
            </LocalizationProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ApolloProvider>
      </HelmetProvider>
    </Suspense>
  );
};

export default App;
