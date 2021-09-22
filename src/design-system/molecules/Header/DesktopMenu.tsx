import React, { useState } from 'react';
import { Grid, useMediaQuery, Theme, useTheme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import styled from '@emotion/styled';
import { ProfilePopover } from '../ProfilePopover';
import { Identicon } from '../../atoms/Identicon';
import { CustomButton } from '../../atoms/Button';
import { Links } from '../../../interfaces';

interface HeaderDesignProps {
  theme: Theme;
}

const StyledGridRightSide = styled(Grid)<HeaderDesignProps>`
  align-items: center;
  justify-content: center;
  ${({ theme }) => `${theme.breakpoints.up('sm')} {
justify-content: flex-end;
}`}
`;

export const StyledGridAvatar = styled(Grid)`
  cursor: pointer;
`;

const getButtonStyles = (isMobile: boolean): SxProps<Theme> =>
  isMobile
    ? { marginLeft: 'inherit', width: 'max-content' }
    : { marginLeft: '1em', width: 'inherit' };

interface DesktopMenuProps {
  handleCallback: () => void;
  walletAvailable: boolean;
  handleHeaderClick?: () => void | Promise<void>;
  handleConnect: () => void | Promise<unknown>;
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
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({
  actionText,
  stablecoinSymbol,
  userBalance,
  secondaryActionText,
  handleSecondaryAction,
  primaryActionText,
  address,
  network,
  handleConnect,
  walletAvailable,
  profileLinks,
  handleCallback,
  isOpen,
  setOpen,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverClick = React.useCallback(
    (event: React.MouseEvent<any, MouseEvent> | undefined) => {
      setAnchorEl(event?.currentTarget);
      setOpen(true);
    },
    [setOpen],
  );
  return (
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
            customStyle={getButtonStyles(isMobile)}
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
            handleAction={handleCallback}
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
  );
};
