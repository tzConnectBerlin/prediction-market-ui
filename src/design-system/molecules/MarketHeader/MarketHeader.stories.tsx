import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MarketHeader, MarketHeaderProps } from './MarketHeader';
import { lightTheme as theme } from '../../../theme';

export default {
  title: 'Molecule/MarketHeader',
  component: MarketHeader,
} as Meta;

const Template: Story<MarketHeaderProps> = (args) => <MarketHeader {...args} />;

export const WithBlockies = Template.bind({});
WithBlockies.args = {
  title: 'Is 1 + 1 = 11 ?',
  cardState: 'Market',
};

export const WithURL = Template.bind({});
WithURL.args = {
  title: 'Is 1 + 1 = 11 ?',
  cardState: 'Market',
  iconURL: 'https://w.wallhaven.cc/full/rd/wallhaven-rd3pjw.jpg',
};

export const WithURLAndStats = Template.bind({});
WithURLAndStats.args = {
  title: 'Will Biden be the President of the United States on May 1, 2021?',
  cardState: 'Auction',
  iconURL: 'https://w.wallhaven.cc/full/rd/wallhaven-rd3pjw.jpg',
  cardStateProps: {
    fontColor: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
  },
  stats: [
    {
      label: 'Consensus Probability',
      value: '0.50',
    },
    {
      label: 'Participants',
      value: '1',
    },
  ],
};
