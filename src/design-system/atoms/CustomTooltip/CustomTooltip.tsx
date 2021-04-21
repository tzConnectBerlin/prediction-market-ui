import styled from '@emotion/styled';
import { Tooltip, IconButton, useTheme } from '@material-ui/core';
import { FcInfo } from 'react-icons/fc';

interface StyledFcInfoProps {
  color?: string;
  height?: string;
  width?: string;
}

export interface CustomTooltipProps extends StyledFcInfoProps {
  text: string;
  arrow?: boolean;
}

const StyledFcInfo = styled(FcInfo)<StyledFcInfoProps>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  circle {
    fill: ${({ color }) => color};
    :first-of-type {
      opacity: 0.16;
    }
  }
  rect {
    fill: ${({ color }) => color};
  }
`;

const StyledIconButton = styled(IconButton)`
  padding: 0;
  &:hover {
    background-color: rgba(0, 0, 0, 0);
  }
`;

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  text,
  color,
  arrow = true,
  height = '1rem',
  width = '1rem',
}) => {
  const theme = useTheme();
  const colorToUse = color ?? theme.palette.primary.main;
  return (
    <Tooltip title={text} arrow={arrow}>
      <StyledIconButton disableFocusRipple disableRipple disableTouchRipple>
        <StyledFcInfo color={colorToUse} height={height} width={width} />
      </StyledIconButton>
    </Tooltip>
  );
};
