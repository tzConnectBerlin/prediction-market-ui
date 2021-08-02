import React from 'react';
import { Card, CardContent, Tabs, Tab, Box, Divider, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { useWallet } from '@tz-contrib/react-wallet-provider';
import { useToasts } from 'react-toast-notifications';
import { TradeForm, TradeFormProps } from './TradeForm';
import { MarketTradeType } from '../../../interfaces';
import { MarketPosition, MarketPositionProps } from '../../molecules/MarketPosition';
import { claimWinnings } from '../../../contracts/Market';
import { logError } from '../../../logger/logger';
import Button from '../../atoms/Button';

const StyledTab = styled(Tab)`
  min-width: auto !important;
  flex: auto;
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
  ...props
}) => {
  const { addToast } = useToasts();
  const [, setCloseMarketId] = React.useState('');
  const handleClose = () => setCloseMarketId('');
  const theme = useTheme();
  const { activeAccount } = useWallet();
  const { t } = useTranslation('common');
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleClaimWinnings = React.useCallback(
    async (handleId: string) => {
      if (activeAccount?.address && handleId) {
        try {
          const hash = await claimWinnings(handleId);
          if (hash) {
            handleClose();
          }
        } catch (error) {
          logError(error);
          const errorText = error?.data[1]?.with?.string || t('txFailed');
          addToast(errorText, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      }
    },
    [activeAccount?.address, addToast, t],
  );

  const buyData: TradeFormProps = {
    title: 'BUY',
    tradeType: MarketTradeType.payIn,
    marketId,
    outcomeItems,
    ...props,
  };

  return (
    <Card>
      <MarketPosition tokenList={tokenList} />
      {tokenList && <Divider color={theme.palette.grey[50]} variant="middle" sx={{ marginY: 2 }} />}
      {!!outcomeItems.length && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="TradeForm">
            <StyledTab label={t('buy')} {...a11yProps(0)} />
            <StyledTab label={t('sell')} {...a11yProps(1)} />
          </Tabs>
        </Box>
      )}
      <CardContent>
        {!outcomeItems.length ? (
          <Button
            style={{ width: '100%' }}
            label={t('claimWinningsPage')}
            onClick={() => handleClaimWinnings(marketId)}
          />
        ) : (
          <>
            <TabPanel value={value} index={0}>
              <TradeForm {...buyData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TradeForm {...buyData} title="Sell" tradeType={MarketTradeType.payOut} />
            </TabPanel>
          </>
        )}
      </CardContent>
    </Card>
  );
};
