import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TwitterShare, TwitterShareProps } from './TwitterShare';

export default {
  title: 'Atom/TwitterShare',
  component: TwitterShare,
} as Meta;

const Template: Story<TwitterShareProps> = (args) => <TwitterShare {...args} />;

export const BlueTwitter = Template.bind({});
BlueTwitter.args = {
  color: 'blue',
  title: 'Share Now',
  text: 'Look at my prediction market here: https://tzconnect.com/prediction-market/10/is-this-a-bear',
};

export const GreyTwitter = Template.bind({});
GreyTwitter.args = {
  color: 'grey',
  title: 'Share Now',
  text: 'Look at my prediction market here: https://tzconnect.com/prediction-market/10/is-this-a-bear',
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
  color: 'blue',
  text: 'Look at my prediction market here: https://tzconnect.com/prediction-market/10/is-this-a-bear',
};
