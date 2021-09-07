import * as React from 'react';
import { CardHeader } from '@material-ui/core';
import { CardTitle, CardTitleProps } from './CardTitle';
import { CardAvatar, CardAvatarProps } from './CardAvatar';

export type MarketCardHeaderProps = CardTitleProps & CardAvatarProps;

const defaultIconSize = 'xl';
const defaultIconType = 'blockies';

export const MarketCardHeader: React.FC<MarketCardHeaderProps> = ({
  title,
  hash,
  iconURL,
  iconSize = defaultIconSize,
  iconType = defaultIconType,
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
