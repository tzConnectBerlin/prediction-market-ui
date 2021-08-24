import * as React from 'react';
import { BlockiesOptions, create } from 'blockies-ts';
import { Avatar, AvatarProps, Theme, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';

export const StyledAvatar = styled(Avatar)<{ theme: Theme }>`
  &.hasBackground {
    background-color: rgba(29, 34, 39, 0.04);
  }

  &.xs {
    width: ${({ theme }) => theme.spacing(3)};
    height: ${({ theme }) => theme.spacing(3)};
  }

  &.sm {
    width: ${({ theme }) => theme.spacing(4)};
    height: ${({ theme }) => theme.spacing(4)};
  }

  &.md {
    width: ${({ theme }) => theme.spacing(5)};
    height: ${({ theme }) => theme.spacing(5)};
  }

  &.lg {
    width: ${({ theme }) => theme.spacing(6)};
    height: ${({ theme }) => theme.spacing(6)};
  }

  &.xl {
    width: ${({ theme }) => theme.spacing(8)};
    height: ${({ theme }) => theme.spacing(8)};
  }

  &.xxl {
    width: ${({ theme }) => theme.spacing(9.625)};
    height: ${({ theme }) => theme.spacing(9.625)};
  }

  &.max {
    width: ${({ theme }) => theme.spacing(18)};
    height: ${({ theme }) => theme.spacing(18)};
  }
`;

export interface IdenticonProps extends Omit<Partial<BlockiesOptions>, 'seed'> {
  type?: 'blockies' | 'tzKtCat';
  seed?: string;
  url?: string;
  variant?: AvatarProps['variant'];
  alt?: string;
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'max';
  hasBackground?: boolean;
  onClick?: (event?: React.MouseEvent<any>) => void | Promise<void>;
}

// TODO: redo with forwardRef
export const Identicon: React.FC<IdenticonProps> = ({
  type = 'blockies',
  seed,
  variant = 'circular',
  alt,
  url,
  iconSize = 'xl',
  hasBackground = true,
  onClick,
  ...rest
}) => {
  const theme = useTheme();
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
      theme={theme}
      variant={variant}
      alt={alt}
      src={data}
      onClick={onClick}
      className={[iconSize || undefined, hasBackground ? 'hasBackground' : undefined].join(' ')}
    />
  );
};
