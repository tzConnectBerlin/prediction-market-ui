import React from 'react';
import { CardHeader } from '@material-ui/core';
import { CardTitle, CardTitleProps } from './CardTitle';
import { CardAvatar, CardAvatarProps } from './CardAvatar';

export type MarketCardHeaderProps = CardTitleProps & CardAvatarProps;

export const MarketCardHeader: React.FC<MarketCardHeaderProps> = ({
  title,
  hash,
  iconURL,
  iconSize = 'xl',
  iconType = 'blockies',
  ...rest
}) => {
  return (
    <CardHeader
      avatar={
        <CardAvatar
          iconURL={iconURL}
          iconSize={iconSize}
          iconType={iconType}
          title={title}
          hash={hash}
        />
      }
      title={<CardTitle title={title} {...rest} />}
    />
  );
};
