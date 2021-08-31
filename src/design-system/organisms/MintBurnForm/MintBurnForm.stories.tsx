import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MintBurnForm, MintBurnFormProps } from './MintBurnForm';

export default {
  title: 'Organism/MintBurnForm',
  component: MintBurnForm,
} as Meta;

const Template: Story<MintBurnFormProps> = (args) => <MintBurnForm {...args} />;

export const Mint = Template.bind({});
Mint.args = {
  tokenName: 'PMM',
  title: 'Mint',
  handleSubmit: () => console.log('submit'),
};
