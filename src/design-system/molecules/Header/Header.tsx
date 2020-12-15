import React from 'react';
import { Button } from '../../atoms/Button';
import './header.css';
import { connectWallet, disconnectWallet } from '../../../wallet/connector';
import { WalletInterface, WalletType } from '../../../interfaces';

const APP_NAME = 'PredictionMarket';
const NETWORK = 'carthagenet';

export interface HeaderProps {
  walletAvailable: boolean;
  setWallet: (wallet: Partial<WalletInterface>) => void;
  wallet?: Partial<WalletInterface>;
}

export const Header: React.FC<HeaderProps> = ({ walletAvailable = false, setWallet, wallet }) => {
  const connectWalletByName = async (walletType: WalletType) => {
    const newWallet = await connectWallet(APP_NAME, NETWORK, walletType);
    newWallet && setWallet(newWallet);
  };
  return (
    <header>
      <div className="wrapper">
        <div>
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path
                d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
                fill="#FFF"
              />
              <path
                d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
                fill="#555AB9"
              />
              <path
                d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
                fill="#91BAF8"
              />
            </g>
          </svg>
          <h1>Prediction Market</h1>
        </div>
        <div>
          {!walletAvailable && (
            <>
              <Button
                label="Connect to thanos"
                primary
                onClick={() => {
                  connectWalletByName('Thanos');
                }}
              />
              <Button
                label="Connect to beacon"
                backgroundColor="yellow"
                onClick={() => {
                  connectWalletByName('Beacon');
                }}
              />
            </>
          )}
          {walletAvailable && (
            <Button
              label={`Disconnect from ${wallet?.type}`}
              backgroundColor="red"
              onClick={() => {
                disconnectWallet(wallet!);
                setWallet({});
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
};
