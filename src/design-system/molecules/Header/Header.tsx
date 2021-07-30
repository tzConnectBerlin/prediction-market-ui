import React, { useState } from 'react';
import { AppBar, Grid, Toolbar, useTheme } from '@material-ui/core';
import { TezosIcon } from '../../atoms/TezosIcon';
import { Typography } from '../../atoms/Typography';
import { ProfilePopover } from '../ProfilePopover';
import { Links } from '../../../interfaces';
import { Identicon } from '../../atoms/Identicon';
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
  userBalance?: number;
  address?: string;
  network?: string;
  actionText: string;
  stablecoinSymbol: string;
  profileLinks?: Links[];
}

export const Header: React.FC<HeaderProps> = ({
  title,
  handleHeaderClick,
  actionText,
  stablecoinSymbol,
  userBalance,
  secondaryActionText,
  handleSecondaryAction,
  primaryActionText,
  address,
  network,
  handleConnect,
  handleDisconnect,
  walletAvailable,
  profileLinks,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isOpen, setOpen] = useState(false);
  const handlePopoverClick = React.useCallback(
    (event: React.MouseEvent<any, MouseEvent> | undefined) => {
      setAnchorEl(event?.currentTarget);
      setOpen(true);
    },
    [],
  );

  const handleCallbackInner = React.useCallback(() => {
    setOpen(false);
    handleDisconnect();
  }, []);

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
              size="h1"
              component="h1"
              sx={{ marginX: 1, whiteSpace: 'nowrap' }}
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
                <Identicon seed={address ?? ''} onClick={handlePopoverClick} type="tzKtCat" />
                <ProfilePopover
                  isOpen={isOpen}
                  onClose={() => setOpen(false)}
                  handleAction={handleCallbackInner}
                  address={address ?? ''}
                  network={network ?? ''}
                  actionText={actionText}
                  anchorEl={anchorEl}
                  stablecoinSymbol={stablecoinSymbol}
                  userBalance={userBalance}
                  links={profileLinks}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
