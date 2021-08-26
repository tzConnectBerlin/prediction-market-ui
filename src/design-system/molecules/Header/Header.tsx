import React, { useState } from 'react';
import { AppBar, Grid, Toolbar, useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ProfilePopover } from '../ProfilePopover';
import { Links } from '../../../interfaces';
import { Identicon } from '../../atoms/Identicon';
import { CustomButton } from '../../atoms/Button';
import { TezosPM } from '../../atoms/TezosPMIcon';

export interface HeaderProps {
  title: string;
  walletAvailable: boolean;
  handleHeaderClick?: () => void | Promise<void>;
  handleConnect: () => void | Promise<unknown>;
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
  const { t } = useTranslation(['common']);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
      component="div"
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Toolbar className="wrapper" sx={{ paddingY: 1 }}>
        <Grid container>
          <Grid
            container
            item
            xs={8}
            sm={6}
            aria-hidden="true"
            alignItems="center"
            sx={{
              marginY: { xs: '0.5rem', sm: '0rem' },
              justifyContent: { xs: 'center', sm: 'flex-start' },
              cursor: 'pointer',
            }}
          >
            <TezosPM
              height={30}
              onClick={handleHeaderClick}
              role="heading"
              aria-label={t('appTitle')}
            />
          </Grid>
          {/* TODO: Move Wallet connection box to a separate component */}
          <Grid
            container
            item
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            xs={4}
            sm={6}
            sx={{
              justifyContent: { xs: 'center', sm: 'flex-end' },
            }}
          >
            {secondaryActionText && !isMobile && (
              <Grid item display="flex" alignItems="center">
                <CustomButton
                  variant="contained"
                  backgroundVariant="secondary"
                  label={secondaryActionText}
                  onClick={handleSecondaryAction}
                />
              </Grid>
            )}
            {!walletAvailable && (
              <Grid item>
                <CustomButton
                  onClick={() => {
                    handleConnect();
                  }}
                  label={primaryActionText}
                  customStyle={{
                    marginLeft: isMobile ? 'inherit' : '1em',
                    width: isMobile ? 'max-content' : 'inherit',
                  }}
                />
              </Grid>
            )}
            {walletAvailable && (
              <Grid item sx={{ cursor: 'pointer' }}>
                <Identicon
                  seed={address ?? ''}
                  onClick={handlePopoverClick}
                  type="tzKtCat"
                  alt="My Profile"
                />
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
