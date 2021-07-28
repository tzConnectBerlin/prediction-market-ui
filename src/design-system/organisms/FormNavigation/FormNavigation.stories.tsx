import { ThemeProvider } from '@material-ui/core';
import { Story, Meta } from '@storybook/react/types-6-0';
import { FormType } from '../../../interfaces';
import { lightTheme } from '../../../theme';
import { FormNavigation, FormNavigationProps } from './FormNavigation';

export default {
  title: 'Organism/FormNavigation',
  component: FormNavigation,
} as Meta;

const Template: Story<FormNavigationProps> = (args) => (
  <ThemeProvider theme={lightTheme}>
    <FormNavigation {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Form Navigation',
  actionList: [
    {
      name: 'Buy',
      formType: FormType.buy,
    },
  ],
  handleAction: (value) => console.log(value),
};

export const SummaryInfo = Template.bind({});
SummaryInfo.args = {
  title: 'Form Navigation',
  formPositions: [
    {
      label: 'Liquidity shares',
      value: '5%',
    },
    {
      label: 'Expected return',
      value: '155 PMM',
    },
  ],
  actionList: [
    {
      name: 'Buy',
      formType: FormType.buy,
    },
    {
      name: 'Sell',
      formType: FormType.sell,
    },
    {
      name: 'Add Liquidity',
      formType: FormType.addLiquidity,
    },
    {
      name: 'Remove Liquidity',
      formType: FormType.removeLiquidity,
    },
  ],
  handleAction: (value) => console.log(value),
};
