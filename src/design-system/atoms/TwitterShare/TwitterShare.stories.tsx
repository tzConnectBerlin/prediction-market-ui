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
  urlHref: 'https://tzconnect.com/prediction-market/10/is-this-a-bear',
  twitterText: 'text=Is%20this%20a%20bear%3F%20',
};

export const GreyTwitter = Template.bind({});
GreyTwitter.args = {
  color: 'grey',
  marketQuestion: 'will-i-fix-my-washing-machine-this-weekend',
  marketId: 77,
  urlHostname: 'tzconnect.predictionmarket.com',
  twitterText: 'text=I%20created%20a%20prediction%20market',
};
