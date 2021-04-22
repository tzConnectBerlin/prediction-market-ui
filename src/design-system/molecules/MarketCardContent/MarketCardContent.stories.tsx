import { Story, Meta } from '@storybook/react/types-6-0';

import { MarketCardContent, MarketCardContentProps } from './MarketCardContent';
import { lightTheme as theme } from '../../../theme';

export default {
  title: 'Molecule/MarketCardContent',
  component: MarketCardContent,
} as Meta;

const Template: Story<MarketCardContentProps> = (args) => <MarketCardContent {...args} />;

export const TokenAndStatisticList = Template.bind({});
TokenAndStatisticList.args = {
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
