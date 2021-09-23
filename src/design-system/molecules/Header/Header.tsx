import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Grid, Toolbar, useMediaQuery, Theme, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { Links } from '../../../interfaces';
import { TezosPM } from '../../atoms/TezosPMIcon';
import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';

interface HeaderDesignProps {
  theme: Theme;
}
const StyledAppBar = styled(AppBar)<{ theme: Theme; component: string }>`
  background-color: ${({ theme }) => theme.palette.background.default};
  .wrapper {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }

  ${({ theme }) => `${theme.breakpoints.down('sm')} {
    .wrapper{
      padding: 1rem;
      min-height: auto;
    }
  }`}
`;

const StyledGridLeftSide = styled(Grid)<HeaderDesignProps>`
  align-items: center;
  justify-content: flex-start;
  padding-left: 0.5em;
  cursor: pointer;
  ${({ theme }) => `${theme.breakpoints.up('sm')} {
    padding-left: 0;
  }`}
`;

export interface HeaderProps {
  walletAvailable: boolean;
  handleHeaderClick?: () => void | Promise<void>;
  handleConnect: () => void | Promise<unknown>;
  handleDisconnect: () => void | Promise<void>;
  handleSecondaryAction?: () => void | Promise<void>;
  mobileMenuClickHandler?: () => void;
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
  mobileMenuClickHandler,
  walletAvailable,
  profileLinks,
}) => {
  const theme = useTheme();
  const { t } = useTranslation(['common']);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isOpen, setOpen] = useState(false);

  const handleCallbackInner = React.useCallback(() => {
    setOpen(false);
    handleDisconnect();
  }, [handleDisconnect]);

  const MenuObject = React.useMemo(
    () => ({
      userBalance,
      stablecoinSymbol,
      walletAvailable,
      handleConnect,
      address,
      profileLinks,
      handleCallback: handleCallbackInner,
      primaryActionText,
      handleSecondaryAction,
      secondaryActionText,
      actionText,
    }),
    [
      userBalance,
      stablecoinSymbol,
      walletAvailable,
      handleConnect,
      address,
      profileLinks,
      handleCallbackInner,
      primaryActionText,
      handleSecondaryAction,
      secondaryActionText,
      actionText,
    ],
  );

  return (
    <StyledAppBar position="sticky" color="transparent" theme={theme} component="div">
      <Toolbar className="wrapper">
        <Grid container>
          <StyledGridLeftSide container item theme={theme} xs={8} sm={6} aria-hidden="true">
            <TezosPM
              height={isMobile ? 24 : 30}
              onClick={handleHeaderClick}
              role="heading"
              aria-label={t('appTitle')}
            />
          </StyledGridLeftSide>
          {/* TODO: Move Wallet connection box to a separate component */}
          {isMobile ? (
            <MobileMenu handleClick={mobileMenuClickHandler} {...MenuObject} />
          ) : (
            <DesktopMenu network={network} isOpen={isOpen} setOpen={setOpen} {...MenuObject} />
          )}
        </Grid>
      </Toolbar>
    </StyledAppBar>
  );
};
