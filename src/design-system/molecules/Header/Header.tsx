import React from 'react';
import { Button } from '../../atoms/Button';
import './header.css';
import { connectWallet, disconnectWallet } from '../../../wallet/connector';
import { WalletInterface, WalletType } from '../../../interfaces';
import { setWalletProvider } from '../../../contracts/Market';
import { APP_NAME, NETWORK } from '../../../utils/globals';
import { TezosIcon } from '../../atoms/TezosIcon';

export interface HeaderProps {
  walletAvailable: boolean;
  setWallet: (wallet: Partial<WalletInterface>) => void;
  wallet?: Partial<WalletInterface>;
  onClick?: () => void | Promise<void>;
}

export const Header: React.FC<HeaderProps> = ({
  walletAvailable = false,
  setWallet,
  wallet,
  onClick,
}) => {
  const connectWalletByName = async (walletType: WalletType) => {
    const newWallet = await connectWallet(APP_NAME, NETWORK, walletType);
    newWallet?.wallet && setWalletProvider(newWallet.wallet);
    newWallet && setWallet(newWallet);
  };
  return (
    <>
      <header>
        <div className="wrapper">
          <div
            onClick={() => {
              onClick && onClick();
            }}
            aria-hidden="true"
          >
            <TezosIcon />
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
                primary
                backgroundColor="#211d1d"
                onClick={() => {
                  disconnectWallet(wallet!);
                  setWallet({});
                }}
              />
            )}
          </div>
        </div>
      </header>
    </>
  );
};
