import React from 'react';
import { Card, CardContent, Tabs, Tab, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { FormikHelpers } from 'formik';
import { ToggleButtonItems } from '../../molecules/FormikToggleButton/FormikToggleButton';
import { TradeValue, TradeForm, TradeFormProps } from './TradeForm';
import { MarketTradeType } from '../../../interfaces';

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

export interface TradeProps {
  /**
   * TokenName to display
   */
  tokenName?: string;
  /**
   * Is wallet connected
   */
  connected?: boolean;
  /**
   * Outcome Items
   */
  outcomeItems: ToggleButtonItems[];
  /**
   * Callback to get the form values
   */
  handleSubmit: (
    values: TradeValue,
    formikHelpers: FormikHelpers<TradeValue>,
  ) => void | Promise<void>;
  /**
   * Callback to refresh prices
   */
  handleRefreshClick?: () => void | Promise<void>;
  /**
   * Callback to get maximum amount
   */
  handleMaxAmount?: TradeFormProps['handleMaxAmount'];
  /**
   * Initial values to use when initializing the form. Default is 0.
   */
  initialValues?: TradeFormProps['initialValues'];
}
export const TradeContainer: React.FC<TradeProps> = ({
  connected,
  tokenName,
  handleSubmit,
  handleRefreshClick,
  handleMaxAmount,
  initialValues,
  outcomeItems,
}) => {
  const { t } = useTranslation('common');
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const buyData: TradeFormProps = {
    title: 'BUY',
    tokenName,
    outcomeItems,
    handleSubmit,
    handleRefreshClick,
    handleMaxAmount,
    connected,
    initialValues,
    tradeType: MarketTradeType.buy,
  };

  return (
    <Card>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="TradeForm">
          <StyledTab label={t('buy')} {...a11yProps(0)} />
          <StyledTab label={t('sell')} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CardContent>
        <TabPanel value={value} index={0}>
          <TradeForm {...buyData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TradeForm {...buyData} title="Sell" tradeType={MarketTradeType.sell} />
        </TabPanel>
      </CardContent>
    </Card>
  );
};
