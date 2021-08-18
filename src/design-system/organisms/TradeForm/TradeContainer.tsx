import * as React from 'react';
import { Card, CardContent, Tabs, Tab, Box, Divider, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import { useToasts } from 'react-toast-notifications';
import { TradeForm, TradeFormProps } from './TradeForm';
import { MarketTradeType } from '../../../interfaces';
import { MarketPosition, MarketPositionProps } from '../../molecules/MarketPosition';
import { claimWinnings } from '../../../contracts/Market';
import { logError } from '../../../logger/logger';

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
  const theme = useTheme();
  const { t } = useTranslation('common');
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const buyData: TradeFormProps = {
    title: 'Buy',
    tradeType: MarketTradeType.payIn,
    marketId,
    outcomeItems,
    connected,
    ...props,
  };

  return (
    <StyledCard>
      <MarketPosition tokenList={tokenList} />
      {tokenList && <Divider color={theme.palette.grey[50]} variant="middle" sx={{ marginY: 2 }} />}
      {outcomeItems.length > 0 && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="TradeForm">
            <StyledTab label={t('buy')} {...a11yProps(0)} />
            <StyledTab label={t('sell')} {...a11yProps(1)} />
          </Tabs>
        </Box>
      )}
      <CardContent>
        <TabPanel value={value} index={0}>
          <TradeForm {...buyData} tokenName="PMM" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TradeForm {...buyData} title="Sell" tradeType={MarketTradeType.payOut} />
        </TabPanel>
      </CardContent>
    </StyledCard>
  );
};
