import React, { useRef, useState, useEffect } from 'react';
import './header.css';
import { Box, Button, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import BigNumber from 'bignumber.js';
import { StableCoinResponse, WalletInterface } from '../../../interfaces';
import { setWalletProvider } from '../../../contracts/Market';
import { APP_NAME, NETWORK } from '../../../utils/globals';
import { TezosIcon } from '../../atoms/TezosIcon';
import { Typography } from '../../atoms/Typography';
import { useMarketPathParams } from '../../../hooks/market';
import { disconnectBeacon, getBeaconInstance } from '../../../wallet';
import { ProfilePopover } from '../ProfilePopover';
import { Identicon } from '../../atoms/Identicon';
import { getAllStablecoinBalances } from '../../../api/mdw';

export interface HeaderProps {
  title: string;
  walletAvailable: boolean;
  setWallet: (wallet: Partial<WalletInterface>) => void;
  wallet?: Partial<WalletInterface>;
  onClick?: () => void | Promise<void>;
}

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
  const headerRef = useRef<any>();
  const [isOpen, setOpen] = useState(false);
  const [userBalance, setUserBalance] = useState('0');

  const { data: stableCoinData } = useQuery<StableCoinResponse, AxiosError, StableCoinResponse>(
    'stablecoinData',
    async () => {
      return getAllStablecoinBalances();
    },
  );

  useEffect(() => {
    stableCoinData && wallet && wallet.pkh && stableCoinData[wallet.pkh]
      ? setUserBalance(new BigNumber(stableCoinData[wallet.pkh]).shiftedBy(-18).toString())
      : setUserBalance('0');
  }, [wallet, stableCoinData]);

  const connectWallet = async () => {
    const newWallet = await getBeaconInstance(APP_NAME, true, NETWORK);
    newWallet?.wallet && setWalletProvider(newWallet.wallet);
    newWallet && setWallet(newWallet);
  };
  return (
    <>
      <header>
        <div className="wrapper" ref={headerRef}>
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
              <Grid container direction="row-reverse">
                <Grid item xs={4}>
                  <Box sx={{ marginLeft: '2.9em', cursor: 'pointer' }}>
                    <Identicon seed={wallet?.pkh ?? ''} onClick={() => setOpen(true)} />
                    <ProfilePopover
                      isOpen={isOpen}
                      onClose={() => setOpen(false)}
                      handleAction={() => {
                        wallet?.wallet && disconnectBeacon(wallet?.wallet);
                        setWallet({});
                      }}
                      address={wallet?.pkh ?? ''}
                      network={wallet?.network ?? ''}
                      actionText={t('disconnectWallet')}
                      stablecoinSymbol="USDtz"
                      stablecoin={userBalance}
                    />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Button
                    onClick={() => {
                      marketAddress && history.push(`/market/${marketAddress}/create-question`);
                    }}
                    endIcon={<AddIcon style={{ fontSize: '2em' }} />}
                    variant="outlined"
                    sx={{
                      borderColor: '#000',
                      color: '#000',
                      textTransform: 'none',
                    }}
                  >
                    {t('createQuestionPage')}
                  </Button>
                </Grid>
              </Grid>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
