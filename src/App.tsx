import React, { Suspense, useEffect, useState } from 'react';
import { LocalizationProvider } from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import './App.css';
import { AppRouter } from './router';
import { connectWallet } from './wallet/connector';
import { getWalletType } from './wallet/utils';
import { WalletProvider } from './wallet/walletContext';
import { NetworkType, WalletInterface } from './interfaces';
import { initIPFSClient } from './ipfs/ipfs';
import { initTezos, initMarketContract, setWalletProvider } from './contracts/Market';

const APP_NAME = process.env.REACT_APP_APP_NAME || 'PredictionMarket';
const NETWORK = process.env.REACT_APP_NETWORK_TYPE || 'delphinet';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_CONTRACT;
const RPC_URL = process.env.REACT_APP_RPC_URL;
const RPC_PORT = process.env.REACT_APP_RPC_PORT;
const IPFS_PORT = process.env.REACT_APP_IPFS_PORT;
const IPFS_API = process.env.REACT_APP_IPFS_API;

const App: React.FC = () => {
  const [wallet, setWallet] = useState<Partial<WalletInterface>>({});
  const checkWalletConnection = async () => {
    const prevUsedWallet = getWalletType();
    if (prevUsedWallet !== null) {
      const walletData = await connectWallet(APP_NAME, NETWORK as NetworkType, prevUsedWallet);
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
      <WalletProvider value={{ wallet, setWallet }}>
        <LocalizationProvider dateAdapter={DateFnsUtils}>
          <AppRouter />
        </LocalizationProvider>
      </WalletProvider>
    </Suspense>
  );
};

export default App;
