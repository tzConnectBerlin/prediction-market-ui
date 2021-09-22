import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Grid, Toolbar, useMediaQuery, Theme, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { Links } from '../../../interfaces';
import { TezosPM } from '../../atoms/TezosPMIcon';
import { MobileHeader } from '../../organisms/MobileHeader';
import { DesktopMenu } from './DesktopMenu';

interface HeaderDesignProps {
  theme: Theme;
}
const StyledAppBar = styled(AppBar)<{ theme: Theme; component: string }>`
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const StyledToolbar = styled(Toolbar)`
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
`;

const StyledGridLeftSide = styled(Grid)<HeaderDesignProps>`
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  ${({ theme }) => `${theme.breakpoints.up('sm')} {
    justify-content: flex-start;
    margin-top: 0;
    margin-bottom: 0;
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

  return (
    <StyledAppBar position="sticky" color="transparent" theme={theme} component="div">
      <StyledToolbar className="wrapper">
        <Grid container>
          <StyledGridLeftSide container item theme={theme} xs={8} sm={6} aria-hidden="true">
            <TezosPM
              height={30}
              onClick={handleHeaderClick}
              role="heading"
              aria-label={t('appTitle')}
            />
          </StyledGridLeftSide>
          {/* TODO: Move Wallet connection box to a separate component */}
          {isMobile ? (
            <MobileHeader
              handleClick={mobileMenuClickHandler}
              userBalance={userBalance}
              stablecoinSymbol={stablecoinSymbol}
              walletAvailable={walletAvailable}
              handleConnect={handleConnect}
              address={address}
              profileLinks={profileLinks}
              handleCallback={handleCallbackInner}
              primaryActionText={primaryActionText}
              handleSecondaryAction={handleSecondaryAction}
              secondaryActionText={secondaryActionText}
              actionText={actionText}
            />
          ) : (
            <DesktopMenu
              userBalance={userBalance}
              stablecoinSymbol={stablecoinSymbol}
              walletAvailable={walletAvailable}
              handleConnect={handleConnect}
              address={address}
              profileLinks={profileLinks}
              handleCallback={handleCallbackInner}
              primaryActionText={primaryActionText}
              handleSecondaryAction={handleSecondaryAction}
              secondaryActionText={secondaryActionText}
              actionText={actionText}
            />
          )}
        </Grid>
      </StyledToolbar>
    </StyledAppBar>
  );
};
