import styled from '@emotion/styled';
import { CardHeader, IconButton, CardContent, Card, CardHeaderProps } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { format } from 'date-fns';
import React from 'react';
import { Identicon } from '../../atoms/Identicon';

const StyledCard = styled(Card)`
  margin: 1em;
`;

const DEFAULT_TIMESTAMP = 'dd MMM yyyy hh:mm:ss aaaa';

export interface AccountCardProps {
  /**
   * contract/account address
   */
  address: string;
  /**
   * timestamp to display on the card
   */
  timestamp?: string;
  /**
   * format to use for the timestamp
   * default: dd MMM yyyy hh:mm:ss aaaa
   */
  timestampFormat?: string;
  /**
   * Body of the card
   */
  content?: React.ReactNode;
  /**
   * Actions to add to the card header
   */
  headerAction?: CardHeaderProps['action'];
  /**
   * hide header action
   * default: false
   */
  hideHeaderAction?: boolean;
}
export const AccountCard: React.FC<AccountCardProps> = ({
  address,
  timestamp,
  timestampFormat = DEFAULT_TIMESTAMP,
  content,
  headerAction,
  hideHeaderAction = false,
}) => {
  return (
    <StyledCard>
      <CardHeader
        avatar={<Identicon seed={address} />}
        action={
          headerAction && !hideHeaderAction ? (
            headerAction
          ) : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={address}
        subheader={timestamp ? format(new Date(timestamp), timestampFormat) : timestamp}
      />
      {content && <CardContent>{content}</CardContent>}
    </StyledCard>
  );
};
