import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Theme, useTheme } from '@mui/material';
import { Typography } from '../../atoms/Typography';
import { CustomButton } from '../../atoms/Button';

export interface ExpandTextProps {
  text: string;
  hasExpandButton?: boolean;
  expandActionText: string;
  shrinkActionText: string;
  handleToggleClick?: (value: boolean) => void | Promise<void>;
}

const Container = styled.div<{ theme: Theme }>`
  &.expandable {
    position: relative;
  }
`;

const CustomButtonStyled = styled(CustomButton)<{ theme: Theme }>`
  color: ${({ theme }) => theme.palette.buttonText.secondary};
  padding: 0.35rem 0;
  background: linear-gradient(
    0deg,
    ${({ theme }) => theme.palette.background.paper} 0,
    ${({ theme }) => theme.palette.buttonText.primary} 70%,
    transparent
  );
  position: absolute;
  bottom: 0;
  width: 100%;
  border: none;
  transition: bottom 0.2s, background 0.2s;
  &:hover {
    background-color: transparent;
  }
  &.isExpanded {
    bottom: -${({ theme }) => theme.spacing(4)};
  }
`;

const defaultHasExpandButton = false;

export const ExpandText: React.FC<ExpandTextProps> = ({
  text,
  handleToggleClick,
  shrinkActionText,
  expandActionText,
  hasExpandButton = defaultHasExpandButton,
}) => {
  const theme = useTheme();
  const [isTruncated, setIsTruncated] = useState(false);
  const [truncate, setTruncate] = useState(true);
  const handleIsTruncate = (value: boolean) => {
    if (!isTruncated) {
      setIsTruncated(value);
    }
  };
  const handleToggle = () => {
    const newTruncate = !truncate;
    setTruncate(newTruncate);
    handleToggleClick && handleToggleClick(newTruncate);
  };
  return (
    <Container className={hasExpandButton ? 'expandable' : undefined} theme={theme}>
      <Typography truncate={truncate} isTruncated={handleIsTruncate}>
        {text}
      </Typography>
      {isTruncated && (
        <CustomButtonStyled
          theme={theme}
          variant="text"
          label={truncate ? expandActionText : shrinkActionText}
          className={!truncate ? 'isExpanded' : undefined}
          color="secondary"
          onClick={handleToggle}
          disableElevation
          disableFocusRipple
          disableRipple
          disableTouchRipple
        />
      )}
    </Container>
  );
};
