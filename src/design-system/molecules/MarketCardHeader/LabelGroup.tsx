import React from 'react';
import { Grid, useTheme } from '@material-ui/core';
import { GiAlarmClock } from 'react-icons/gi';
import { Label, LabelProps } from '../../atoms/Label';

type CardStateProps = Omit<LabelProps, 'text'>;

export interface LabelGroupProps {
  /**
   * card label mostly used for market steps (Market,Auction,...)
   */
  cardState: string;
  /**
   * market close timestamp to display on the card
   */
  closeDate: string;
  cardStateProps?: CardStateProps;
}

export const LabelGroup: React.FC<LabelGroupProps> = ({ cardState, closeDate, cardStateProps }) => {
  const theme = useTheme();

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item>
        <Label text={cardState} {...cardStateProps} />
      </Grid>
      <Grid item>
        <Label
          text={closeDate}
          backgroundColor={theme.palette.grey[500]}
          fontColor={theme.palette.text.primary}
          icon={<GiAlarmClock />}
        />
      </Grid>
    </Grid>
  );
};
