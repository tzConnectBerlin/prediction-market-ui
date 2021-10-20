import * as React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { ExpandText, ExpandTextProps } from './ExpandText';

export default {
  title: 'Molecule/ExpandText',
  component: ExpandText,
  argTypes: {},
} as Meta;

const Template: Story<ExpandTextProps> = (args) => <ExpandText {...args} />;

export const LargeText = Template.bind({});
LargeText.args = {
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'.repeat(20),
  expandActionText: 'Read more',
  shrinkActionText: 'Read less',
  hasExpandButton: true,
};

export const SmallText = Template.bind({});
SmallText.args = {
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  expandActionText: 'Read more',
  shrinkActionText: 'Read less',
};
