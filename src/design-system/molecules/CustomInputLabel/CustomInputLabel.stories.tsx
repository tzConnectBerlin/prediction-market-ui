import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CustomInputLabel, CustomInputLabelProps } from './CustomInputLabel';

export default {
  title: 'Molecule/CustomInputLabel',
  component: CustomInputLabel,
} as Meta;

const Template: Story<CustomInputLabelProps> = (args) => <CustomInputLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Enter a question',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Enter a question',
  required: true,
};
