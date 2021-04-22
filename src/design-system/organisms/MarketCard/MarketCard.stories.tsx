import { Story, Meta } from '@storybook/react/types-6-0';
import { MarketCard, MarketCardProps } from './MarketCard';
import { lightTheme as theme } from '../../../theme';

export default {
  title: 'Organism/MarketCard',
  component: MarketCard,
} as Meta;

const Template: Story<MarketCardProps> = (args) => <MarketCard {...args} />;
export const WithMarketCloseDate = Template.bind({});
WithMarketCloseDate.args = {
  iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
  title: 'Market card with image icon',
  timestamp: new Date(new Date().getTime() + 100000000),
};

export const WithLongTitleText = Template.bind({});
WithLongTitleText.args = {
  iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
  title:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  timestamp: new Date(new Date().getTime() + 100000000),
  tokenList: [
    {
      label: 'YES',
      value: '95$',
      valueColor: theme.palette.success.main,
    },
    {
      label: 'NO',
      value: '5$',
      valueColor: theme.palette.error.main,
    },
  ],
};

export const WithMarketCloseText = Template.bind({});
WithMarketCloseText.args = {
  hash: 'QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3',
  title: 'Closed Market card and Auction step',
  cardLabel: 'Auction',
  timestamp: new Date(new Date().getTime() - 100000),
};

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  title: 'Closed Market card and Auction step',
  cardLabel: 'Auction',
  timestamp: new Date(new Date().getTime() - 100000),
};

export const WithHashOnly = Template.bind({});
WithHashOnly.args = {
  hash: 'QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3',
  title: 'Market card with hash generated icon',
  timestamp: new Date(new Date().getTime() + 100000000),
  tokenList: [
    {
      label: 'YES',
      value: '95$',
      valueColor: theme.palette.success.main,
    },
    {
      label: 'NO',
      value: '5$',
      valueColor: theme.palette.error.main,
    },
  ],
  statisticList: [
    {
      label: 'WEEKLY',
      value: 'YES 95$',
      valueColor: theme.palette.success.main,
      changes: 'up',
    },
    {
      label: 'VOLUME',
      value: '5$',
      valueColor: theme.palette.text.primary,
    },
  ],
};

export const WithMarketContent = Template.bind({});
WithMarketContent.args = {
  hash: 'QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3',
  title: 'Closed Market card with Matket Content',
  cardLabel: 'Market',
  timestamp: new Date(new Date().getTime() - 100000),
  tokenList: [
    {
      label: 'YES',
      value: '95$',
      valueColor: theme.palette.success.main,
    },
    {
      label: 'NO',
      value: '5$',
      valueColor: theme.palette.error.main,
    },
  ],
  statisticList: [
    {
      label: 'WEEKLY',
      value: 'YES 95$',
      valueColor: theme.palette.success.main,
      changes: 'up',
    },
    {
      label: 'VOLUME',
      value: '5$',
      valueColor: theme.palette.text.primary,
    },
  ],
};
