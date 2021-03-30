import { Story, Meta } from '@storybook/react/types-6-0';
import { RiAccountCircleFill } from 'react-icons/ri';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../../theme';
import { CustomButton, ButtonProps } from './Button';

export default {
  title: 'Atom/Button',
  component: CustomButton,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <ThemeProvider theme={theme}>
    <CustomButton {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
  backgroundVariant: 'secondary',
};

export const Outlined = Template.bind({});
Outlined.args = {
  label: 'Button',
  variant: 'outlined',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Button',
  disabled: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  label: 'Button',
  icon: <RiAccountCircleFill />,
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  label: 'Button',
  backgroundVariant: 'primary',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};
