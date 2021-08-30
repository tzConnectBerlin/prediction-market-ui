import * as React from 'react';
import { Card, CardContent, Tabs, Tab, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { MarketEnterExitDirection } from '../../../interfaces';
import { MintBurnFormProps } from '.';
import { MintBurnForm } from './MintBurnForm';

const StyledTab = styled(Tab)`
  min-width: auto;
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

export type MintBurnProps = Omit<MintBurnFormProps, 'title'>;
export const MintBurnContainer: React.FC<MintBurnProps> = ({ ...props }) => {
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
          <StyledTab label={t('burn')} {...a11yProps(1)} disabled />
        </Tabs>
      </Box>
      <CardContent>
        <TabPanel value={value} index={0}>
          <MintBurnForm {...props} title={t('mintButton')} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MintBurnForm
            {...props}
            direction={MarketEnterExitDirection.burn}
            title={t('burnButton')}
          />
        </TabPanel>
      </CardContent>
    </StyledCard>
  );
};
