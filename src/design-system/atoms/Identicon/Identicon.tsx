import React, { MouseEventHandler } from 'react';
import { BlockiesOptions, create } from 'blockies-ts';
import { Avatar, AvatarProps } from '@material-ui/core';
import styled from '@emotion/styled';
import { theme } from '../../../theme';

const StyledAvatar = styled(Avatar)`
  background-color: rgba(29, 34, 39, 0.04);
  &.xs {
    width: ${theme.spacing(3)};
    height: ${theme.spacing(3)};
  }

  &.sm {
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
  }

  &.md {
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
  }

  &.lg {
    width: ${theme.spacing(6)};
    height: ${theme.spacing(6)};
  }

  &.xl {
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
  }

  &.xxl {
    width: ${theme.spacing(10)};
    height: ${theme.spacing(10)};
  }
`;

export interface IdenticonProps extends Omit<Partial<BlockiesOptions>, 'seed'> {
  type?: 'blockies' | 'tzKtCat';
  seed?: string;
  url?: string;
  variant?: AvatarProps['variant'];
  alt?: string;
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  onClick?: (event?: React.MouseEvent<any>) => void | Promise<void>;
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
