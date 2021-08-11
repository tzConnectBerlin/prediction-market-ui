import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { SkeletonCard, SkeletonCardProps } from './SkeletonCard';

export default {
  title: 'Organism/SkeletonCard',
  component: SkeletonCard,
} as Meta;

const Template: Story<SkeletonCardProps> = (args) => <SkeletonCard {...args} />;

export const DefaultCard = Template.bind({});

export const AltCard = Template.bind({});
AltCard.args = {
  labelList: ['hello', 'testing', 'card'],
};
