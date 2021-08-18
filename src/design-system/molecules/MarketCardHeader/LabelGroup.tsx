import * as React from 'react';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container direction="row" spacing={1} justifyContent={isMobile ? 'center' : 'inherit'}>
      <Grid item>
        <Label text={cardState} {...cardStateProps} />
      </Grid>
    </Grid>
  );
};
