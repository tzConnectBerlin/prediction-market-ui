import * as React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Address, AddressProps } from './Address';

export default {
  title: 'Atom/Address',
  component: Address,
  argTypes: {},
} as Meta;

const Template: Story<AddressProps> = (args) => <Address {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  address: 'tz1f65FZjkygEuc5VU7q2sS4mtn8MC9ZHDh7',
};

export const TrimmedAddress = Template.bind({});
TrimmedAddress.args = {
  address: 'tz1f65FZjkygEuc5VU7q2sS4mtn8MC9ZHDh7',
  trim: true,
};

/**
 * TODO: fix the sizing issue
 */
export const CustomSize = Template.bind({});
CustomSize.args = {
  address: 'tz1f65FZjkygEuc5VU7q2sS4mtn8MC9ZHDh7',
  trim: true,
  size: 'body2',
};
