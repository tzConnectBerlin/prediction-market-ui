import { Story, Meta } from '@storybook/react/types-6-0';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../../theme';
import { Loading, LoadingProps } from './Loading';

export default {
  title: 'Atom/Loading',
  component: Loading,
} as Meta;

const Template: Story<LoadingProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Loading {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  size: 'lg',
};
