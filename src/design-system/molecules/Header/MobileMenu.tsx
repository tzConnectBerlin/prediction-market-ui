import * as React from 'react';
import { Grid, IconButton, Drawer, Fade, Theme, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { AccountCircleRounded } from '@material-ui/icons';
import { CustomButton } from '../../atoms/Button';
import { Identicon } from '../../atoms/Identicon';
import { Links } from '../../../interfaces';
import { MainMenu } from './MainMenu';

const CustomIconButton = styled(IconButton)`
  padding: 0;
  width: 25.5px;
  &:hover {
    background-color: transparent;
  }
`;

const FullSizeDrawer = styled(Drawer)`
  .MuiPaper-root {
    width: 100%;
    height: 100vh;
  }
`;
const StyledGridAvatar = styled(Grid)`
  cursor: pointer;
`;
interface HeaderDesignProps {
  theme: Theme;
}
const DrawerHeader = styled.div<HeaderDesignProps>`
  padding: ${({ theme }) => theme.spacing(2)};
  text-align: right;
`;

export interface MobileMenuProps {
  handleClick?: () => void;
  userBalance?: number;
  stablecoinSymbol: string;
  walletAvailable: boolean;
  address?: string;
  profileLinks?: Links[];
  handleConnect: () => void | Promise<unknown>;
  handleSecondaryAction?: () => void | Promise<void>;
  handleProfileAction?: () => void;
  secondaryActionText?: string;
  primaryActionText: string;
  actionText: string;
  handleCallback: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  handleClick,
  userBalance,
  stablecoinSymbol,
  walletAvailable,
  address,
  profileLinks,
  handleConnect,
  handleSecondaryAction,
  handleProfileAction,
  primaryActionText,
  secondaryActionText,
  actionText,
  handleCallback,
}) => {
  const MenuObject = React.useMemo(
    () => ({
      userBalance,
      stablecoinSymbol,
      address,
      profileLinks,
      handleSecondaryAction,
      handleProfileAction,
      secondaryActionText,
      actionText,
      handleCallback,
    }),
    [
      userBalance,
      stablecoinSymbol,
      address,
      profileLinks,
      handleSecondaryAction,
      handleProfileAction,
      secondaryActionText,
      actionText,
      handleCallback,
    ],
  );

  const [openMenu, setOpenMenu] = React.useState(false);
  const theme = useTheme();

  const buttonStyles = { marginLeft: 'inherit', width: 'max-content' };
  const handleOpen = React.useCallback(() => {
    setOpenMenu(true);
    if (handleClick) handleClick();
  }, [handleClick]);
  const handleClose = React.useCallback(() => {
    setOpenMenu(false);
    if (handleClick) handleClick();
  }, [handleClick]);

  return (
    <>
      <Grid container item justifyContent="flex-end" xs={4}>
        {!walletAvailable && (
          <Grid item alignSelf="center">
            <AccountCircleRounded
              fontSize="large"
              color="primary"
              onClick={handleOpen}
              aria-label="menu"
            />
          </Grid>
        )}
        {walletAvailable && (
          <Identicon
            seed={address ?? ''}
            onClick={handleOpen}
            aria-label="menu"
            type="tzKtCat"
            alt="My Profile"
          />
        )}
      </Grid>
      <Fade in={openMenu}>
        <FullSizeDrawer variant="persistent" anchor="right" open={openMenu}>
          <DrawerHeader theme={theme}>
            <CustomIconButton onClick={handleClose} aria-label="closeMenu">
              <img src="/images/close.svg" alt="close menu" />
            </CustomIconButton>
          </DrawerHeader>
          {!walletAvailable && (
            <Grid item container justifyContent="center" alignContent="center" alignItems="center">
              <CustomButton
                onClick={() => {
                  handleConnect();
                }}
                label={primaryActionText}
                customStyle={buttonStyles}
              />
            </Grid>
          )}
          {walletAvailable && (
            <StyledGridAvatar item>
              <MainMenu {...MenuObject} />
            </StyledGridAvatar>
          )}
        </FullSizeDrawer>
      </Fade>
    </>
  );
};
