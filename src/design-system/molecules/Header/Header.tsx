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
import { CustomButton } from '../../atoms/Button';

export interface HeaderProps {
  title: string;
  walletAvailable: boolean;
  setWallet: (wallet: Partial<WalletInterface>) => void;
  wallet?: Partial<WalletInterface>;
  onClick?: () => void | Promise<void>;
  marketAddress?: string;
  userBalance?: string | number;
}

const HeaderContainer = styled.header`
  .wrapper {
    box-shadow: 0 12px 8px -8px rgb(0, 0, 0, 0.1);
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flex-container {
    display: flex;
    align-items: center;
  }

  svg {
    display: inline-block;
    vertical-align: top;
  }

  h1 {
    font-weight: 900;
    font-size: 1.3em;
    line-height: 1;
    display: inline-block;
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
      <div className="wrapper" ref={headerRef}>
        <div
          onClick={() => {
            onClick && onClick();
          }}
          aria-hidden="true"
          className="flex-container"
        >
          <TezosIcon />
          <Typography size="body" component="h1" margin="0.4em 0 0.4em 1em">
            {title}
          </Typography>
        </div>
        {/* TODO: Move Wallet connection box to a separate component */}
        <div className="flex-container">
          <CustomButton variant="outlined" label={t('Create Market')} />
          {!walletAvailable && (
            <>
              <CustomButton
                onClick={connectWallet}
                label={t('Sign In')}
                customStyle={{ marginLeft: '1em' }}
              />
            </>
          )}
          {walletAvailable && (
            <Box component="span" sx={{ cursor: 'pointer', mx: 1 }}>
              <Identicon seed={wallet?.pkh ?? ''} onClick={() => setOpen(true)} type="tzKtCat" />
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
          )}
        </div>
      </div>
    </HeaderContainer>
  );
};
