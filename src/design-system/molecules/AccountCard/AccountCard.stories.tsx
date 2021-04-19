import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { AccountCard, AccountCardProps } from '.';
import { Typography } from '../../atoms/Typography';

export default {
  title: 'Molecules/AccountCard',
  component: AccountCard,
} as Meta;

const Template: Story<AccountCardProps> = (args) => <AccountCard {...args} />;

const DemoManagerComponent: React.FC = () => (
  <Typography size="body2" color="textSecondary" component="p">
    Manager: tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb
  </Typography>
);

export const Base = Template.bind({});
Base.args = {
  address: 'KT1Dp3wVhtBSkisSMDe4WpbicrB5NF7gjA9s',
  timestamp: '2020-12-22T12:52:51Z',
};

export const WithContent = Template.bind({});
WithContent.args = {
  address: 'KT1Dp3wVhtBSkisSMDe4WpbicrB5NF7gjA9s',
  timestamp: '2020-12-22T12:52:51Z',
  content: <DemoManagerComponent />,
};
