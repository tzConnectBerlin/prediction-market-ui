import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Grid, Toolbar, useMediaQuery, Theme, useTheme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import styled from '@emotion/styled';
import { ProfilePopover } from '../ProfilePopover';
import { Links } from '../../../interfaces';
import { Identicon } from '../../atoms/Identicon';
import { CustomButton } from '../../atoms/Button';
import { TezosPM } from '../../atoms/TezosPMIcon';

const StyledAppBar = styled(AppBar)<{ theme: Theme; component: string }>`
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const StyledToolbar = styled(Toolbar)`
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
`;

const StyledGridAvatar = styled(Grid)`
  cursor: pointer;
`;

const StyledGridLeftSide = styled(Grid)<{ theme: Theme }>`
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

const StyledGridRightSide = styled(Grid)<{ theme: Theme }>`
  align-items: center;
  justify-content: center;
  ${({ theme }) => `${theme.breakpoints.up('sm')} {
    justify-content: flex-end;
  }`}
`;

const getButtonStyles = (isMobile: boolean): SxProps<Theme> =>
  isMobile
    ? { marginLeft: 'inherit', width: 'max-content' }
    : { marginLeft: '1em', width: 'inherit' };

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
          <StyledGridRightSide container item theme={theme} spacing={2} xs={4} sm={6}>
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
                  sx={getButtonStyles(isMobile)}
                />
              </Grid>
            )}
            {walletAvailable && (
              <StyledGridAvatar item>
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
              </StyledGridAvatar>
            )}
          </StyledGridRightSide>
        </Grid>
      </StyledToolbar>
    </StyledAppBar>
  );
};
