import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MarketPosition, MarketPositionProps } from './MarketPosition';
import { TokenType } from '../../../interfaces/market';

export default {
  title: 'Molecule/MarketPosition',
  component: MarketPosition,
} as Meta;

const Template: Story<MarketPositionProps> = (args) => <MarketPosition {...args} />;

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
};
