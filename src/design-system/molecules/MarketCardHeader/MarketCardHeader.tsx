import * as React from 'react';
import styled from '@emotion/styled';
import { CardHeader } from '@mui/material';
import { CardTitle, CardTitleProps } from './CardTitle';
import { CardAvatar, CardAvatarProps } from './CardAvatar';

const StyledCardHeader = styled(CardHeader)`
  align-items: flex-start;
`;

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
    <StyledCardHeader
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
