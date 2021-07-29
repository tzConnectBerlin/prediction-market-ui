import { Story, Meta } from '@storybook/react/types-6-0';
import { PositionSummary, PositionProps } from './PositionSummary';
import { TokenType } from '../../../interfaces/market';

export default {
  title: 'Molecule/PositionSummary',
  component: PositionSummary,
} as Meta;

const Template: Story<PositionProps> = (args) => <PositionSummary {...args} />;

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
