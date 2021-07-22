import { Story, Meta } from '@storybook/react/types-6-0';
import { FormNavigation, FormNavigationProps } from './FormNavigation';

export default {
  title: 'Organism/FormNavigation',
  component: FormNavigation,
} as Meta;

const Template: Story<FormNavigationProps> = (args) => <FormNavigation {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Form Navigation',
  formList: [
    {
      label: 'My Portfolio',
      url: '/portfolio',
    },
  ],
};
