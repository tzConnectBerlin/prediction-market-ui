import * as React from 'react';
import { Card, CardContent, Tabs, Tab, Box, useTheme, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';

const StyledTab = styled(Tab)<{ lowercase: boolean; theme: Theme }>`
  min-width: auto;
  color: ${({ theme }) => theme.palette.secondary.light};
  flex: auto;
  text-transform: ${({ lowercase }) => (lowercase ? 'none' : 'uppercase')};
  font-weight: ${({ lowercase }) => (lowercase ? 'bold' : 'initial')};
  font-size: ${({ lowercase }) => (lowercase ? '1rem' : 'initial')};
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

export interface TabProps {
  title: string;
  disabled?: boolean;
  lowercase?: boolean;
  children: React.ReactNode;
}
export interface TabContainerProps {
  label: string;
  tabs: TabProps[];
}

const defaultLowercase = true;

export const TabContainer: React.FC<TabContainerProps> = ({ label, tabs }) => {
  const { t } = useTranslation('common');
  const [value, setValue] = React.useState(0);
  const [innerTabs, setInnerTabs] = React.useState<TabProps[]>([]);
  const theme = useTheme();

  React.useEffect(() => {
    setInnerTabs(tabs);
  }, [tabs]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleTabs = () => {
    return innerTabs.map((tab, i) => (
      <StyledTab
        theme={theme}
        lowercase={tab.lowercase ?? defaultLowercase}
        label={t(tab.title)}
        {...a11yProps(i)}
        key={`${tab.title}-${i}`}
        disabled={tab.disabled}
      />
    ));
  };
  const handleTabPanel = () => {
    return innerTabs.map((tab, i) => (
      <TabPanel value={value} index={i} key={`tabPanel-${tab.title}-${i}`}>
        {tab.children}
      </TabPanel>
    ));
  };

  return (
    <StyledCard>
      <Box borderBottom={1} borderColor="divider">
        <Tabs value={value} onChange={handleChange} aria-label={label}>
          {innerTabs && handleTabs()}
        </Tabs>
      </Box>
      <CardContent>{innerTabs && handleTabPanel()}</CardContent>
    </StyledCard>
  );
};
