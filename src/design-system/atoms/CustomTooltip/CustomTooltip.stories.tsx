import { Story, Meta } from '@storybook/react/types-6-0';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../../theme';
import { CustomTooltip, CustomTooltipProps } from './CustomTooltip';

export default {
  title: 'Atom/CustomTooltip',
  component: CustomTooltip,
} as Meta;

const Template: Story<CustomTooltipProps> = (args) => (
  <ThemeProvider theme={theme}>
    <CustomTooltip {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  text: 'This is a tooltip',
};
