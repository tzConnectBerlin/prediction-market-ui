import * as React from 'react';
import { Popover } from '@material-ui/core';
import { Links } from '../../../interfaces';
import { MainMenu } from '../Header/MainMenu';

export interface ProfilePopoverProps {
  openPositions?: number;
  address: string;
  network: string;
  userBalance?: number;
  stablecoinSymbol: string;
  isOpen: boolean;
  actionText: string;
  anchorEl?: HTMLElement | null;
  links?: Links[];
  onClose: () => void | Promise<void>;
  handleAction?: () => void | Promise<void>;
  handleCallback: () => void;
}

const defaultLinks: Links[] = [];

export const ProfilePopoverComponent: React.FC<ProfilePopoverProps> = ({
  openPositions,
  address,
  isOpen,
  userBalance,
  stablecoinSymbol,
  anchorEl,
  links = defaultLinks,
  onClose,
  handleAction,
  handleCallback,
  actionText,
}: ProfilePopoverProps) => {
  const id = isOpen ? 'profile-popover' : undefined;
  const MenuObject = React.useMemo(
    () => ({
      openPositions,
      userBalance,
      stablecoinSymbol,
      address,
      profileLinks: links,
      handleSecondaryAction: handleCallback,
      handleProfileAction: handleAction,
      actionText,
      handleCallback,
    }),
    [
      openPositions,
      userBalance,
      stablecoinSymbol,
      address,
      links,
      handleCallback,
      handleAction,
      actionText,
    ],
  );

  return (
    <Popover
      id={id}
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <MainMenu {...MenuObject} />
    </Popover>
  );
};

export const ProfilePopover = React.memo(ProfilePopoverComponent);
