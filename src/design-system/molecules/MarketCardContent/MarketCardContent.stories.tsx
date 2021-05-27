import { Story, Meta } from '@storybook/react/types-6-0';
import { MarketCardContent, MarketCardContentProps } from './MarketCardContent';
import { Currency, TokenType } from '../../../interfaces/market';

export default {
  title: 'Molecule/MarketCardContent',
  component: MarketCardContent,
} as Meta;

const Template: Story<MarketCardContentProps> = (args) => <MarketCardContent {...args} />;

export const TokenAndStatisticList = Template.bind({});
TokenAndStatisticList.args = {
  tokenList: [
    {
      type: TokenType.yes,
      value: 14,
    },
    {
      type: TokenType.no,
      value: 5,
    },
  ],
  statisticList: [
    {
      type: 'WEEKLY',
      value: '95',
      changes: 'up',
      currency: Currency.USD,
      tokenType: TokenType.yes,
    },
    {
      type: 'VOLUME',
      value: '5',
      currency: Currency.USD,
    },
  ],
};
