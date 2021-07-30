import { Story, Meta } from '@storybook/react/types-6-0';
import { LiquidityForm, LiquidityFormProps } from './LiquidityForm';

export default {
  title: 'Organism/LiquidityForm',
  component: LiquidityForm,
} as Meta;

const Template: Story<LiquidityFormProps> = (args) => <LiquidityForm {...args} />;

export const AddLiquidity = Template.bind({});
AddLiquidity.args = {
  tokenName: 'PMM',
  title: 'Add Liquidity',
  handleSubmit: () => console.log('submit'),
};

export const RemoveLiquidity = Template.bind({});
RemoveLiquidity.args = {
  tokenName: 'PMM',
  title: 'Remove Liquidity',
  handleSubmit: () => console.log('submit'),
};
