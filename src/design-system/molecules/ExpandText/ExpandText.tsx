import { useState } from 'react';
import styled from '@emotion/styled';
import { Typography } from '../../atoms/Typography';
import { CustomButton } from '../../atoms/Button';

export interface ExpandTextProps {
  text: string;
  expandActionText: string;
  shrinkActionText: string;
  handleToggleClick?: (value: boolean) => void | Promise<void>;
}

const CustomButtonStyled = styled(CustomButton)`
  padding-left: 0;
  padding-right: 0;
`;

export const ExpandText: React.FC<ExpandTextProps> = ({
  text,
  handleToggleClick,
  shrinkActionText,
  expandActionText,
}) => {
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
    <>
      <Typography truncate={truncate} isTruncated={handleIsTruncate}>
        {text}
      </Typography>
      {isTruncated && (
        <CustomButtonStyled
          variant="text"
          label={truncate ? expandActionText : shrinkActionText}
          onClick={handleToggle}
          disableElevation
          disableFocusRipple
          disableRipple
          disableTouchRipple
        />
      )}
    </>
  );
};
