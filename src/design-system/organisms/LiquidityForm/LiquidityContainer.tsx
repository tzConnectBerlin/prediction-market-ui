import * as React from 'react';
import { Card, CardContent, Tabs, Tab, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { LiquidityForm, LiquidityFormProps } from './LiquidityForm';

const StyledTab = styled(Tab)`
  min-width: auto;
  flex: auto;
`;
const StyledCard = styled(Card)`
  padding: 0 1.5rem;

  .MuiCardContent-root {
    padding-left: 0;
    padding-right: 0;
  }
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

  return (
    <StyledCard>
      <Box borderBottom={1} borderColor="divider">
        <Tabs value={value} onChange={handleChange} aria-label="LiquidityForm">
          <StyledTab label={t('addLiquidity')} {...a11yProps(0)} />
          <StyledTab label={t('removeLiquidity')} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CardContent>
        <TabPanel value={value} index={0}>
          <LiquidityForm {...props} operationType="add" title={t('addLiquidity')} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LiquidityForm {...props} title={t('removeLiquidity')} operationType="remove" />
        </TabPanel>
      </CardContent>
    </StyledCard>
  );
};
