import React from 'react';
import './header.css';
import { Avatar, Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { connectWallet, disconnectWallet } from '../../../wallet/connector';
import { WalletInterface, WalletType } from '../../../interfaces';
import { setWalletProvider } from '../../../contracts/Market';
import { APP_NAME, NETWORK } from '../../../utils/globals';
import { TezosIcon } from '../../atoms/TezosIcon';
import { Typography } from '../../atoms/Typography';

export interface HeaderProps {
  title: string;
  walletAvailable: boolean;
  setWallet: (wallet: Partial<WalletInterface>) => void;
  wallet?: Partial<WalletInterface>;
  onClick?: () => void | Promise<void>;
}

const APP_URL = `${window.location.protocol}//${window.location.host}`;

const walletIcons = {
  Thanos: <Avatar src={`${APP_URL}/icons/wallets/extension-thanos.png`} />,
  Beacon: <Avatar src={`${APP_URL}/icons/wallets/extension-beacon.png`} />,
};

export const Header: React.FC<HeaderProps> = ({
  title,
  walletAvailable = false,
  setWallet,
  wallet,
  onClick,
}) => {
  const { t } = useTranslation(['common']);
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
            <Typography size="body" component="h1" margin="0.4em 0 0.4em 1em">
              {title}
            </Typography>
          </div>
          {/* TODO: Move Wallet connection box to a separate component */}
          <div>
            {!walletAvailable && (
              <>
                <Box component="span" sx={{ m: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      connectWalletByName('Thanos');
                    }}
                    endIcon={walletIcons.Thanos}
                    sx={{ textTransform: 'none' }}
                  >
                    {t('connectUsing')}
                  </Button>
                </Box>
                <Box component="span" sx={{ m: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      connectWalletByName('Beacon');
                    }}
                    endIcon={walletIcons.Beacon}
                    sx={{ textTransform: 'none' }}
                  >
                    {t('connectUsing')}
                  </Button>
                </Box>
              </>
            )}
            {walletAvailable && (
              <Button
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  disconnectWallet(wallet!);
                  setWallet({});
                }}
                variant="outlined"
                sx={{ borderColor: '#000', color: '#000', textTransform: 'none' }}
                endIcon={wallet?.type ? walletIcons[wallet.type] : undefined}
              >
                {t('disconnectFrom')}
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
