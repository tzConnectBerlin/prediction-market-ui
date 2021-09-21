import * as React from 'react';
import { Grid } from '@material-ui/core';
import { Label, LabelProps } from '../../atoms/Label';

type CardStateProps = Omit<LabelProps, 'text'>;

export interface LabelGroupProps {
  /**
   * card label mostly used for market steps (Market,Auction,...)
   */
  cardState: string;
  cardStateProps?: CardStateProps;
}

export const LabelGroup: React.FC<LabelGroupProps> = ({ cardState, cardStateProps }) => {
  return (
    <Grid container direction="row" spacing={1}>
      <Grid item>
        <Label text={cardState} {...cardStateProps} />
      </Grid>
    </Grid>
  );
};
