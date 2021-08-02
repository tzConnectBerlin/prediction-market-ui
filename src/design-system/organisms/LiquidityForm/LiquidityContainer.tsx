import React from 'react';
import { Card, CardContent, Tabs, Tab, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { LiquidityForm, LiquidityFormProps } from './LiquidityForm';
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

export type LiquidityProps = Omit<LiquidityFormProps, 'title' | 'tradeType'>;
export const LiquidityContainer: React.FC<LiquidityProps> = (props) => {
  const { t } = useTranslation('common');
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const liquidityData: LiquidityFormProps = {
    title: 'Add Liquidity',
    tradeType: MarketTradeType.payIn,
    ...props,
  };

  return (
    <Card>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="LiquidityForm">
          <StyledTab label={t('addLiquidity')} {...a11yProps(0)} />
          <StyledTab label={t('removeLiquidity')} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CardContent>
        <TabPanel value={value} index={0}>
          <LiquidityForm {...liquidityData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LiquidityForm
            {...liquidityData}
            title="Remove Liquidity"
            tradeType={MarketTradeType.payOut}
          />
        </TabPanel>
      </CardContent>
    </Card>
  );
};
