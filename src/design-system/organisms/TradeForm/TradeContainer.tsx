import React from 'react';
import { Card, CardContent, Tabs, Tab, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { TradeForm, TradeFormProps } from './TradeForm';

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

const buyData: TradeFormProps = {
  title: 'BUY',
  tokenName: 'USDtz',
  outComeItems: [
    {
      value: 'Yes',
      label: 'Yes (12$)',
    },
    {
      value: 'No',
      label: 'No (8$)',
    },
  ],
  handleSubmit: () => console.log('submit buy'),
};

const sellData: TradeFormProps = {
  title: 'SELL',
  tokenName: 'USDtz',
  outComeItems: [
    {
      value: 'Yes',
      label: 'Yes (12$)',
    },
    {
      value: 'No',
      label: 'No (8$)',
    },
  ],
  handleSubmit: () => console.log('submit sell'),
};

export const TradeContainer: React.FC = () => {
  const { t } = useTranslation('common');
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
          <TradeForm {...sellData} />
        </TabPanel>
      </CardContent>
    </Card>
  );
};
