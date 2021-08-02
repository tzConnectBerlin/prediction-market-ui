import { Story, Meta } from '@storybook/react/types-6-0';
import { TwitterShare, TwitterShareProps } from './TwitterShare';

export default {
  title: 'Atom/TwitterShare',
  component: TwitterShare,
} as Meta;

const Template: Story<TwitterShareProps> = (args) => <TwitterShare {...args} />;

export const BlueTwitter = Template.bind({});
BlueTwitter.args = { color: 'blue' };

export const GreyTwitter = Template.bind({});
GreyTwitter.args = { color: 'grey' };
