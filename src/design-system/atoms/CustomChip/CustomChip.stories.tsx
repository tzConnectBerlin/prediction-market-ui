import { Story, Meta } from '@storybook/react/types-6-0';
import { RiRefreshLine } from 'react-icons/ri';
import { ChipProps } from '@material-ui/core';
import { CustomChip } from './CustomChip';

export default {
  title: 'Atom/CustomChip',
  component: CustomChip,
} as Meta;

const handleClick = (e: any) => {
  console.log(e.target.outerText);
};

const Template: Story<ChipProps> = (args) => <CustomChip {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'test label',
};

export const iconChip = Template.bind({});
iconChip.args = {
  label: 'test label',
  icon: <RiRefreshLine />,
};

export const ClickableChip = Template.bind({});
ClickableChip.args = {
  label: 'clickable',
  icon: <RiRefreshLine />,
  clickable: true,
  onClick: handleClick,
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  label: 'test label',
  color: 'primary',
};

export const OutLine = Template.bind({});
OutLine.args = {
  label: 'test label',
  variant: 'outlined',
  color: 'primary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled label',
  disabled: true,
};
