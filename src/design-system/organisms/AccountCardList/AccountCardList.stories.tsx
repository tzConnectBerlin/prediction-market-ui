import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { AccountCardList, AccountCardListProps } from '.';
import { Typography } from '../../atoms/Typography';

export default {
  title: 'Organism/AccountCardList',
  component: AccountCardList,
} as Meta;

const Template: Story<AccountCardListProps> = (args) => <AccountCardList {...args} />;

const DemoManagerComponent: React.FC = () => (
  <Typography size="body2" color="textSecondary" component="p">
    Manager: tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb
  </Typography>
);

export const Base = Template.bind({});
Base.args = {
  list: [
    {
      address: 'KT1Dp3wVhtBSkisSMDe4WpbicrB5NF7gjA9s',
      timestamp: '2020-12-22T12:52:51Z',
      content: <DemoManagerComponent />,
    },
    {
      address: 'KT2Dp3wVhtBSkisSMDe4WpbicrB5NF7gjA9s',
      timestamp: '2020-12-22T12:52:51Z',
      content: <DemoManagerComponent />,
    },
    {
      address: 'KT3Dp3wVhtBSkisSMDe4WpbicrB5NF7gjA9s',
      timestamp: '2020-12-22T12:52:51Z',
      content: <DemoManagerComponent />,
    },
    {
      address: 'KT4Dp3wVhtBSkisSMDe4WpbicrB5NF7gjA9s',
      timestamp: '2020-12-22T12:52:51Z',
      content: <DemoManagerComponent />,
    },
    {
      address: 'KT5Dp3wVhtBSkisSMDe4WpbicrB5NF7gjA9s',
      timestamp: '2020-12-22T12:52:51Z',
      content: <DemoManagerComponent />,
    },
  ],
};
