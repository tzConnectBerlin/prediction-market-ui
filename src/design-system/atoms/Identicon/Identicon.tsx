import React from 'react';
import { BlockiesOptions, create } from 'blockies-ts';
import { Avatar, AvatarProps, Theme } from '@material-ui/core';
import styled from '@emotion/styled';
import { theme } from '../../../theme';

const StyledAvatar = styled(Avatar)`
  &.small {
    width: ${theme.spacing(3)};
    height: ${theme.spacing(3)};
  }

  &.medium {
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
  }

  &.large {
    width: ${theme.spacing(6)};
    height: ${theme.spacing(6)};
  }

  &.x-large {
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
  }
`;

export interface IdenticonProps extends Omit<Partial<BlockiesOptions>, 'seed'> {
  type?: 'blockies' | 'tzKtCat';
  seed?: string;
  url?: string;
  variant?: AvatarProps['variant'];
  alt?: string;
  iconSize?: 'small' | 'meduim' | 'large' | 'x-large';
  onClick?: () => void | Promise<void>;
}

export const Identicon: React.FC<IdenticonProps> = ({
  type = 'blockies',
  seed,
  variant = 'circular',
  alt,
  url,
  iconSize = 'meduim',
  onClick,
  ...rest
}) => {
  const data =
    url ||
    // eslint-disable-next-line no-nested-ternary
    (type === 'tzKtCat' && seed
      ? `https://services.tzkt.io/v1/avatars2/${seed}`
      : type === 'blockies' && seed
      ? create({ seed, ...rest }).toDataURL()
      : undefined);
  return (
    <StyledAvatar
      variant={variant}
      alt={alt}
      src={data}
      onClick={onClick}
      className={iconSize || undefined}
    />
  );
};
