import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Identicon, IdenticonProps } from './Identicon';

export default {
  title: 'Atom/Identicon',
  component: Identicon,
} as Meta;

const Template: Story<IdenticonProps> = (args) => <Identicon {...args} />;

export const IdenticonA = Template.bind({});
IdenticonA.args = {
  seed: 'A',
};

export const IdenticonB = Template.bind({});
IdenticonB.args = {
  seed: 'B',
};
