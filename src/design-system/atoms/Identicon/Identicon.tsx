import React from 'react';
import { BlockiesOptions, create } from 'blockies-ts';
import { Avatar, AvatarProps } from '@material-ui/core';

export interface IdenticonProps extends Omit<Partial<BlockiesOptions>, 'seed'> {
  seed: string;
  variant?: AvatarProps['variant'];
  alt?: string;
}

export const Identicon: React.FC<IdenticonProps> = ({
  seed,
  variant = 'circular',
  alt,
  ...rest
}) => {
  const data = create({ seed, ...rest }).toDataURL();
  return <Avatar variant={variant} alt={alt} src={data} />;
};
