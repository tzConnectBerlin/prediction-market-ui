import * as React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Identicon, IdenticonProps } from './Identicon';

export default {
  title: 'Atom/Identicon',
  component: Identicon,
} as Meta;

const Template: Story<IdenticonProps> = (args) => <Identicon {...args} />;

export const IdenticonWithSeed = Template.bind({});
IdenticonWithSeed.args = {
  seed: 'QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3',
};

export const IdenticonWithURL = Template.bind({});
IdenticonWithURL.args = {
  url: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
};

export const IdenticonWithBackground = Template.bind({});
IdenticonWithBackground.args = {
  type: 'tzKtCat',
  seed: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
};

export const IdenticonMaxSize = Template.bind({});
IdenticonMaxSize.args = {
  url: 'https://w.wallhaven.cc/full/rd/wallhaven-rd3pjw.jpg',
  iconSize: 'max',
  hasBackground: false,
};
