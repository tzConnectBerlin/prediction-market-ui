import React from 'react';
import { CardHeader, Skeleton } from '@material-ui/core';
import { CardTitle, CardTitleProps } from './CardTitle';
import { CardAvatar, CardAvatarProps } from './CardAvatar';

export type MarketCardHeaderProps = CardTitleProps & CardAvatarProps;

export const MarketCardHeader: React.FC<MarketCardHeaderProps> = ({
  title,
  hash,
  iconURL,
  iconSize = 'xl',
  iconType = 'blockies',
  cardState,
  ...rest
}) => {
  return (
    <CardHeader
      avatar={
        cardState === 'skeleton' ? (
          <Skeleton variant="circular" width={40} height={40} />
        ) : (
          <CardAvatar
            iconURL={iconURL}
            iconSize={iconSize}
            iconType={iconType}
            title={title}
            hash={hash}
          />
        )
      }
      title={<CardTitle cardState={cardState} title={title} {...rest} />}
    />
  );
};
