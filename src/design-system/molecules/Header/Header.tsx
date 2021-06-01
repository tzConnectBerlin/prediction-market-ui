import React, { useState } from 'react';
import { AppBar, Grid, Toolbar, useTheme } from '@material-ui/core';
import { TezosIcon } from '../../atoms/TezosIcon';
import { Typography } from '../../atoms/Typography';
import { ProfilePopover } from '../ProfilePopover';
import { Identicon } from '../../atoms/Identicon';
import { roundToTwo } from '../../../utils/math';
import { CustomButton } from '../../atoms/Button';

export interface HeaderProps {
  title: string;
  walletAvailable: boolean;
  handleHeaderClick?: () => void | Promise<void>;
  handleConnect: () => void | Promise<void>;
  handleDisconnect: () => void | Promise<void>;
  handleSecondaryAction?: () => void | Promise<void>;
  primaryActionText: string;
  secondaryActionText?: string;
  userBalance?: string | number;
  address?: string;
  network?: string;
  actionText: string;
  stablecoinSymbol: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  handleHeaderClick,
  actionText,
  stablecoinSymbol,
  userBalance = 0,
  secondaryActionText,
  handleSecondaryAction,
  primaryActionText,
  address,
  network,
  handleConnect,
  handleDisconnect,
  walletAvailable,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isOpen, setOpen] = useState(false);

  const handlePopoverClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Toolbar className="wrapper" sx={{ paddingY: 1 }}>
        <Grid container>
          <Grid
            container
            item
            xs={12}
            sm={6}
            aria-hidden="true"
            alignItems="center"
            sx={{
              marginY: { xs: '0.5rem', sm: '0rem' },
              justifyContent: { xs: 'center', sm: 'flex-start' },
              cursor: 'pointer',
            }}
          >
            <TezosIcon onClick={handleHeaderClick} />
            <Typography
              size="h5"
              component="h1"
              sx={{ fontWeight: 'bold', marginX: 1, whiteSpace: 'nowrap' }}
              onClick={handleHeaderClick}
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
                  onClick={handleConnect}
                  label={primaryActionText}
                  customStyle={{ marginLeft: '1em' }}
                />
              </Grid>
            )}
            {walletAvailable && (
              <Grid item sx={{ cursor: 'pointer' }}>
                <Identicon
                  seed={address ?? ''}
                  onClick={(event: any) => handlePopoverClick(event)}
                  type="tzKtCat"
                />
                <ProfilePopover
                  isOpen={isOpen}
                  onClose={() => setOpen(false)}
                  handleAction={handleDisconnect}
                  address={address ?? ''}
                  network={network ?? ''}
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
