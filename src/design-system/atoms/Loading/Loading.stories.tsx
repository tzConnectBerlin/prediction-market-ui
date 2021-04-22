import { Story, Meta } from '@storybook/react/types-6-0';
import { Loading, LoadingProps } from './Loading';

export default {
  title: 'Atom/Loading',
  component: Loading,
} as Meta;

const Template: Story<LoadingProps> = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'lg',
};
