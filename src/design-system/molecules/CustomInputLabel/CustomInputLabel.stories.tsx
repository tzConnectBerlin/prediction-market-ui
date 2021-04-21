import { Story, Meta } from '@storybook/react/types-6-0';
import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme as theme } from '../../../theme';
import { CustomInputLabel, CustomInputLabelProps } from './CustomInputLabel';

export default {
  title: 'Molecule/CustomInputLabel',
  component: CustomInputLabel,
} as Meta;

const Template: Story<CustomInputLabelProps> = (args) => (
  <ThemeProvider theme={theme}>
    <CustomInputLabel {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Enter a question',
  theme,
  marginTop: '2%',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Enter a question',
  theme,
  marginTop: '2%',
  required: true,
};

export const WithoutTheme = Template.bind({});
WithoutTheme.args = {
  label: 'Enter a question',
  marginTop: '2%',
  required: true,
};
