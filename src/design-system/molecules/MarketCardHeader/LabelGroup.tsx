import React from 'react';
import { Grid } from '@material-ui/core';
import { GiAlarmClock } from 'react-icons/gi';
import { Label } from '../../atoms/Label';

export interface LabelGroupProps {
  /**
   * card label mostly used for market steps (Market,Auction,...)
   */
  cardState: string;
  /**
   * market close timestamp to display on the card
   */
  closeDate: string;
}

export const LabelGroup: React.FC<LabelGroupProps> = ({ cardState, closeDate }) => (
  <Grid container direction="row" spacing={1}>
    <Grid item>
      <Label text={cardState} />
    </Grid>
    <Grid item>
      <Label
        text={closeDate}
        backgroundVariant="grey"
        backgroundColor="500"
        icon={<GiAlarmClock />}
      />
    </Grid>
  </Grid>
);
