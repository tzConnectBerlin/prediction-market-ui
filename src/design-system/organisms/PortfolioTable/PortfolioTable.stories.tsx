import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PortfolioTable, PortfolioTableProps, Row } from './PortfolioTable';

export default {
  title: 'Organism/PortfolioTable',
  component: PortfolioTable,
} as Meta;

const heading: string[] = ['Market', 'Status', 'Role', 'Shares', 'Share Price', 'Total', ''];

const rowList: Row[] = [
  {
    columns: [
      'Will Biden be President on January 21, 2022?',
      'Open',
      'Adjudicator',
      '10',
      '$ 0.95',
      '$ 0.95',
    ],
    rowAction: {
      label: 'Close Market',
      handleAction: () => console.log('hi'),
    },
  },
  {
    columns: [
      'Will Biden be President on January 21, 2022?',
      'Open',
      'Adjudicator',
      '10',
      '$ 0.95',
      '$ 0.95',
    ],
    rowAction: {
      label: 'Close Market',
      handleAction: () => console.log('hi'),
    },
  },
  {
    columns: [
      'Will Biden be President on January 21, 2022?',
      'Open',
      'Adjudicator',
      '10',
      '$ 0.95',
      '$ 0.95',
    ],
    rowAction: {
      label: 'Close Market',
      handleAction: () => console.log('hi'),
    },
  },
  {
    columns: [
      'Will Biden be President on January 21, 2022?',
      'Open',
      'Adjudicator',
      '10',
      '$ 0.95',
      '$ 0.95',
    ],
    rowAction: {
      label: 'Close Market',
      handleAction: () => console.log('hi'),
    },
  },
];
const Template: Story<PortfolioTableProps> = (args) => <PortfolioTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Market',
  rows: rowList,
  heading,
};
