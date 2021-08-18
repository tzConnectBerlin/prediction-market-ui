import * as React from 'react';
import { Card, CardContent, Tabs, Tab, Box, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { TradeForm, TradeFormProps } from './TradeForm';
import { MarketTradeType } from '../../../interfaces';
import { MarketPositionProps } from '../../molecules/MarketPosition';
import { Typography } from '../../atoms/Typography';

const StyledTab = styled(Tab)`
  min-width: auto !important;
  flex: auto;
`;

const StyledCard = styled(Card)`
  margin-bottom: 1.5rem;
`;

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

export type TradeProps = Omit<TradeFormProps, 'title' | 'tradeType'>;
export const TradeContainer: React.FC<TradeProps & MarketPositionProps> = ({
  tokenList,
  outcomeItems,
  marketId,
  connected,
  ...props
}) => {
  const { t } = useTranslation('common');
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const buyData: TradeFormProps = {
    title: 'BUY',
    tradeType: MarketTradeType.payIn,
    marketId,
    outcomeItems,
    connected,
    ...props,
  };

  const enableSell = React.useMemo(() => {
    if (typeof buyData.userTokens === 'undefined') {
      return false;
    }
    return buyData.userTokens.reduce((prev, item) => {
      if (Number(item.quantity) > 0 || prev) {
        return true;
      }
      return false;
    }, false);
  }, [buyData]);

  return (
    <StyledCard>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="TradeForm">
          <StyledTab label={t('buy')} {...a11yProps(0)} />
          <StyledTab label={t('sell')} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CardContent>
        <TabPanel value={value} index={0}>
          <TradeForm {...buyData} tokenName="PMM" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {enableSell && (
            <TradeForm
              {...buyData}
              title="Sell"
              tradeType={MarketTradeType.payOut}
              tokenName="PMM"
            />
          )}
          {!enableSell && (
            <Grid container alignContent="center" justifyContent="center">
              <Grid item>
                <Typography>{t('onlyTokenHolders')}</Typography>
              </Grid>
            </Grid>
          )}
        </TabPanel>
      </CardContent>
    </StyledCard>
  );
};
