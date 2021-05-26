import { Chip, ChipProps } from '@material-ui/core';
import React from 'react';

export const CustomChip: React.FC<ChipProps> = ({
  size = 'small',
  color = 'secondary',
  onDelete = undefined,
  ...rest
}) => {
  return <Chip size={size} color={color} {...rest} />;
};
