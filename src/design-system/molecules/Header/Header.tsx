import React, { useRef, useState } from 'react';
import { AppBar, Grid, Toolbar } from '@material-ui/core';
import { WalletInterface } from '../../../interfaces';
import { TezosIcon } from '../../atoms/TezosIcon';
import { Typography } from '../../atoms/Typography';
import { disconnectBeacon } from '../../../wallet';
import { ProfilePopover } from '../ProfilePopover';
import { Identicon } from '../../atoms/Identicon';
import { roundToTwo } from '../../../utils/math';
import { CustomButton } from '../../atoms/Button';

export interface HeaderProps {
  title: string;
  walletAvailable: boolean;
  setWallet: (wallet: Partial<WalletInterface>) => void;
  wallet?: Partial<WalletInterface>;
  handleHeaderClick?: () => void | Promise<void>;
  handlePrimaryAction: () => void | Promise<void>;
  handleSecondaryAction?: () => void | Promise<void>;
  primaryActionText: string;
  secondaryActionText?: string;
  marketAddress?: string;
  userBalance?: string | number;
  address: string;
  network: string;
  actionText: string;
  stablecoinSymbol: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  walletAvailable = false,
  setWallet,
  wallet,
  handleHeaderClick,
  address,
  network,
  actionText,
  stablecoinSymbol,
  userBalance = 0,
  secondaryActionText,
  handleSecondaryAction,
  handlePrimaryAction,
  primaryActionText,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const headerRef = useRef<any>();
  const [isOpen, setOpen] = useState(false);

  const handlePopoverClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar className="wrapper" ref={headerRef} sx={{ paddingY: 1 }}>
        <Grid container>
          <Grid
            container
            item
            xs={12}
            sm={6}
            onClick={handleHeaderClick}
            aria-hidden="true"
            alignItems="center"
            sx={{
              marginY: { xs: '0.5rem', sm: '0rem' },
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <TezosIcon />
            <Typography
              size="h5"
              component="h1"
              sx={{ fontWeight: 'bold', marginX: 1, whiteSpace: 'nowrap' }}
            >
              {title}
            </Typography>
          </Grid>
          {/* TODO: Move Wallet connection box to a separate component */}
          <Grid
            container
            item
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            xs={12}
            sm={6}
            sx={{
              justifyContent: { xs: 'center', sm: 'flex-end' },
            }}
          >
            {secondaryActionText && (
              <Grid item display="flex" alignItems="center">
                <CustomButton
                  variant="outlined"
                  label={secondaryActionText}
                  onClick={handleSecondaryAction}
                />
              </Grid>
            )}
            {!walletAvailable && (
              <Grid item>
                <CustomButton
                  onClick={handlePrimaryAction}
                  label={primaryActionText}
                  customStyle={{ marginLeft: '1em' }}
                />
              </Grid>
            )}
            {walletAvailable && (
              <Grid item sx={{ cursor: 'pointer' }}>
                <Identicon
                  seed={wallet?.pkh ?? ''}
                  onClick={(event: any) => handlePopoverClick(event)}
                  type="tzKtCat"
                />
                <ProfilePopover
                  isOpen={isOpen}
                  onClose={() => setOpen(false)}
                  handleAction={() => {
                    wallet?.wallet && disconnectBeacon(wallet?.wallet);
                    setWallet({});
                  }}
                  address={address}
                  network={network}
                  actionText={actionText}
                  anchorEl={anchorEl}
                  stablecoinSymbol={stablecoinSymbol}
                  userBalance={roundToTwo(Number(userBalance))}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
