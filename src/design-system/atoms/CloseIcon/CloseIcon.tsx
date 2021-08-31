import styled from '@emotion/styled';
import { useTheme } from '@material-ui/core';
import { IoIosClose } from 'react-icons/io';

export interface CloseIconProps {
  color?: string;
}

export const CircleBackground = styled.div`
  border-radius: 50%;
  background: rgba(1, 102, 255, 0.16);
  height: 0.7em;
  width: 0.7em;
  display: flex;
`;

export const CloseIcon: React.FC<CloseIconProps> = ({ color }) => {
  const theme = useTheme();
  const colorToUse = color ?? theme.palette.primary.main;
  return (
    <CircleBackground>
      <IoIosClose fill={colorToUse} size="0.7em" />
    </CircleBackground>
  );
};
