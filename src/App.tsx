import React, { Suspense, useEffect } from 'react';
import { LocalizationProvider } from '@mui/lab';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from 'react-toast-notifications';
import DateFnsUtils from '@mui/lab/AdapterDateFns';
import { ThemeProvider } from '@mui/material';
import { Global } from '@emotion/react';
import { WalletProvider } from '@tezos-contrib/react-wallet-provider';
import { ApolloProvider } from '@apollo/client';
import { GlobalStyle } from './styles/style';
import { lightTheme } from './styles/theme';
import { AppRouter } from './router';
import { NETWORK, APP_NAME, TORUS_ENABLED } from './globals';
import { Loading } from './design-system/atoms/Loading';
import { tzStatsBlockExplorer } from './utils/TzStatsBlockExplorer';
import { useStore } from './store/store';
import { getSavedSettings } from './utils/misc';
import { SettingValues } from './interfaces';
import { graphqlClient } from './graphql/client';

const defaultSettings: SettingValues = {
  advanced: false,
  deadline: 30,
  maxSlippage: 5,
};

const App: React.FC = () => {
  const { setSettings } = useStore();

  useEffect(() => {
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
        </ApolloProvider>
      </HelmetProvider>
    </Suspense>
  );
};

export default App;
