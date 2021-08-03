import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Skeleton, useMediaQuery, useTheme } from '@material-ui/core';
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
  const { t } = useTranslation('common');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const labelIcon =
    closeDate === t('active') || closeDate === t('closed') ? null : <GiAlarmClock />;

  return (
    <Grid container direction="row" spacing={1} justifyContent={isMobile ? 'center' : 'inherit'}>
      <Grid item flexGrow={1}>
        {cardState === 'skeleton' ? <Skeleton /> : <Label text={cardState} {...cardStateProps} />}
      </Grid>
      <Grid item flexGrow={1}>
        {cardState === 'skeleton' ? (
          <Skeleton />
        ) : (
          <Label
            text={closeDate}
            backgroundColor={theme.palette.grey[500]}
            fontColor={theme.palette.text.primary}
            icon={labelIcon}
          />
        )}
      </Grid>
    </Grid>
  );
};
