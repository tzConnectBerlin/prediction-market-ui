import React, { useRef, useState } from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { WalletInterface } from '../../../interfaces';
import { setWalletProvider } from '../../../contracts/Market';
import { APP_NAME, NETWORK } from '../../../utils/globals';
import { TezosIcon } from '../../atoms/TezosIcon';
import { Typography } from '../../atoms/Typography';
import { disconnectBeacon, getBeaconInstance } from '../../../wallet';
import { ProfilePopover } from '../ProfilePopover';
import { Identicon } from '../../atoms/Identicon';
import { roundToTwo } from '../../../utils/math';

export interface HeaderProps {
  title: string;
  walletAvailable: boolean;
  setWallet: (wallet: Partial<WalletInterface>) => void;
  wallet?: Partial<WalletInterface>;
  onClick?: () => void | Promise<void>;
  marketAddress?: string;
  userBalance?: string | number;
}

const HeaderContainer = styled.div`
  .wrapper {
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  svg {
    display: inline-block;
    vertical-align: top;
  }

  h1 {
    font-weight: 900;
    font-size: 20px;
    line-height: 1;
    margin: 6px 0 6px 10px;
    display: inline-block;
    vertical-align: top;
  }
`;

export const Header: React.FC<HeaderProps> = ({
  title,
  walletAvailable = false,
  setWallet,
  wallet,
  onClick,
  marketAddress,
  userBalance = 0,
}) => {
  const { t } = useTranslation(['common']);
  const history = useHistory();
  const headerRef = useRef<any>();
  const [isOpen, setOpen] = useState(false);

  const connectWallet = async () => {
    const newWallet = await getBeaconInstance(APP_NAME, true, NETWORK);
    newWallet?.wallet && setWalletProvider(newWallet.wallet);
    newWallet && setWallet(newWallet);
  };
  return (
    <HeaderContainer>
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
                    <Identicon
                      seed={wallet?.pkh ?? ''}
                      onClick={() => setOpen(true)}
                      type="tzKtCat"
                    />
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
                      stablecoin={roundToTwo(Number(userBalance))}
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
    </HeaderContainer>
  );
};
