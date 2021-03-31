import React, { useRef, useState } from 'react';
import { AppBar, Box, Toolbar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
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
    <AppBar position="static" color="transparent">
      <Toolbar className="wrapper" ref={headerRef} sx={{ paddingY: 1 }}>
        <Box
          sx={{ display: { xs: 'flex' }, alignItems: 'center' }}
          onClick={() => {
            onClick && onClick();
          }}
          aria-hidden="true"
          className="flex-container"
        >
          <TezosIcon />
          <Typography size="h5" component="h1" sx={{ fontWeight: 'bold', marginX: 1 }}>
            {title}
          </Typography>
        </Box>
        {/* TODO: Move Wallet connection box to a separate component */}
        <Box
          sx={{
            display: { xs: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexGrow: 1,
          }}
        >
          <CustomButton variant="outlined" label={t('Create Market')} />
          {!walletAvailable && (
            <CustomButton
              onClick={connectWallet}
              label={t('Sign In')}
              customStyle={{ marginLeft: '1em' }}
            />
          )}
          {walletAvailable && (
            <Box component="span" sx={{ cursor: 'pointer', marginX: 0.3 }}>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};
