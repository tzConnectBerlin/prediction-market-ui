import * as React from 'react';
import { Card, CardContent, Tabs, Tab, Box, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { MintForm, MintFormProps } from '../MintForm';

const StyledTab = styled(Tab)`
  min-width: auto !important;
  flex: auto;
`;

const StyledCard = styled(Card)`
  margin-bottom: 1.5rem;
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

export type TradeProps = Omit<MintFormProps, 'title'>;
export const MintBurnContainer: React.FC<TradeProps> = ({ ...props }) => {
  const { t } = useTranslation('common');
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <StyledCard>
      <Box borderBottom={1} borderColor="divider">
        <Tabs value={value} onChange={handleChange} aria-label="TradeForm">
          <StyledTab label={t('mint')} {...a11yProps(0)} />
          <StyledTab label={t('burn')} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CardContent>
        <TabPanel value={value} index={0}>
          <MintForm {...props} title={t('mintButton')} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MintForm {...props} title={t('burnButton')} />
        </TabPanel>
      </CardContent>
    </StyledCard>
  );
};
