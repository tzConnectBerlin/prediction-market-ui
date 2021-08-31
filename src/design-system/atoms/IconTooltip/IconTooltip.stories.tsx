import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { IconTooltip, IconTooltipProps } from './IconTooltip';
import { Typography } from '../Typography';

export default {
  title: 'Atom/IconTooltip',
  component: IconTooltip,
} as Meta;

const Template: Story<IconTooltipProps> = (args) => <IconTooltip {...args} />;

export const Auto = Template.bind({});
Auto.args = {
  description: 'simple description',
};

export const ElementDescription = Template.bind({});
ElementDescription.args = {
  description: (
    <div>
      Sale price is discounted by{' '}
      <Typography component="span" fontWeight="bold">
        5%
      </Typography>
      . This fee goes to the market creator and liquidity providers.
    </div>
  ),
  placement: 'bottom',
};

export const LongDescription = Template.bind({});
LongDescription.args = {
  description:
    'Sale price is discounted by 5%. This fee goes to the market creator and liquidity providers.',
  placement: 'bottom-end',
};

export const MaxWidth = Template.bind({});
MaxWidth.args = {
  description:
    'Sale price is discounted by 5%. This fee goes to the market creator and liquidity providers.',
  placement: 'bottom-end',
  maxWidth: '300px',
};
