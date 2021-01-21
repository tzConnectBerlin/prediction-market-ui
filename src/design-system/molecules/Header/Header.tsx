import React from 'react';
import './header.css';
import { Box, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { WalletInterface } from '../../../interfaces';
import { setWalletProvider } from '../../../contracts/Market';
import { APP_NAME, NETWORK } from '../../../utils/globals';
import { TezosIcon } from '../../atoms/TezosIcon';
import { Typography } from '../../atoms/Typography';
import { useMarketPathParams } from '../../../hooks/market';
import { disconnectBeacon, getBeaconInstance } from '../../../wallet';

export interface HeaderProps {
  title: string;
  walletAvailable: boolean;
  setWallet: (wallet: Partial<WalletInterface>) => void;
  wallet?: Partial<WalletInterface>;
  onClick?: () => void | Promise<void>;
}

const APP_URL = `${window.location.protocol}//${window.location.host}`;

export const Header: React.FC<HeaderProps> = ({
  title,
  walletAvailable = false,
  setWallet,
  wallet,
  onClick,
}) => {
  const { t } = useTranslation(['common']);
  const history = useHistory();
  const { marketAddress } = useMarketPathParams();
  const connectWallet = async () => {
    const newWallet = await getBeaconInstance(APP_NAME, true, NETWORK);
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
                  <Button variant="outlined" onClick={connectWallet} sx={{ textTransform: 'none' }}>
                    {t('connectWallet')}
                  </Button>
                </Box>
              </>
            )}
            {walletAvailable && (
              <>
                <Box component="span" sx={{ m: 1 }}>
                  <Button
                    onClick={() => {
                      marketAddress && history.push(`/market/${marketAddress}/create-question`);
                    }}
                    endIcon={<AddIcon style={{ fontSize: '40px' }} />}
                    variant="outlined"
                    sx={{
                      borderColor: '#000',
                      color: '#000',
                      textTransform: 'none',
                    }}
                  >
                    {t('createQuestionPage')}
                  </Button>
                </Box>
                <Box component="span" sx={{ m: 1 }}>
                  <Button
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      wallet?.wallet && disconnectBeacon(wallet?.wallet);
                      setWallet({});
                    }}
                    variant="outlined"
                    sx={{
                      borderColor: '#000',
                      color: '#000',
                      textTransform: 'none',
                    }}
                    endIcon={<CloseIcon style={{ fontSize: '40px' }} />}
                  >
                    {t('disconnectWallet')}
                  </Button>
                </Box>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
