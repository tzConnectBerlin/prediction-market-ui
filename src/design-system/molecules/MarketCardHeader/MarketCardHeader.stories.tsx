import { Story, Meta } from '@storybook/react/types-6-0';
import { MarketCardHeader, MarketCardHeaderProps } from './MarketCardHeader';

export default {
  title: 'Molecules/MarketCardHeader',
  component: MarketCardHeader,
} as Meta;

const Template: Story<MarketCardHeaderProps> = (args) => <MarketCardHeader {...args} />;

export const WithMarketCloseDate = Template.bind({});
WithMarketCloseDate.args = {
  iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
  title: 'Market card with image icon',
  closeDate: 'Closed',
};

export const WithLongTitleText = Template.bind({});
WithLongTitleText.args = {
  iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
  title:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  closeDate: '6th May 2021 09:32',
};

export const WithHashOnly = Template.bind({});
WithHashOnly.args = {
  hash: 'QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3',
  title: 'Market card with hash generated icon',
  cardState: 'Market',
  closeDate: '6th May 2021 09:32',
};
