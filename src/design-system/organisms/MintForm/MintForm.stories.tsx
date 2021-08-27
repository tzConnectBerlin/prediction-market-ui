import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MintForm, MintFormProps } from './MintForm';

export default {
  title: 'Organism/MintForm',
  component: MintForm,
} as Meta;

const Template: Story<MintFormProps> = (args) => <MintForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  tokenName: 'PMM',
  title: 'Mint',
  handleSubmit: () => console.log('submit'),
};
