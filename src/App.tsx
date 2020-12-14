import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { LocalizationProvider } from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import './App.css';
import { AppRouter } from './router';
import { connectWallet } from './wallet/connector';
import { getWalletType } from './wallet/utils';
import { WalletProvider } from './wallet/walletContext';
import { WalletInterface } from './interfaces';

const APP_NAME = 'PredictionMarket';
const NETWORK = 'carthagenet';

const App: React.FC = () => {
  const [wallet, setWallet] = useState<Partial<WalletInterface>>({});
  const checkWalletConnection = async () => {
    const prevUsedWallet = getWalletType();
    if (prevUsedWallet !== null) {
      const walletData = await connectWallet(APP_NAME, NETWORK, prevUsedWallet);
      walletData && setWallet(walletData);
    }
  };

  useEffect(() => {
    checkWalletConnection();
  }, []);

  return (
    <Suspense fallback="Loading...">
      <WalletProvider value={wallet}>
        <LocalizationProvider dateAdapter={DateFnsUtils}>
          <AppRouter />
        </LocalizationProvider>
      </WalletProvider>
    </Suspense>
  );
};

export default App;
