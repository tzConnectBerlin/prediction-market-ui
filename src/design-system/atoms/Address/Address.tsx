import React, { useState } from 'react';
import { Grid, Theme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import styled, { CSSObject } from '@emotion/styled';
import { Typography, TypographyProps } from '../Typography';

type TrimSizeType = 'small' | 'medium' | 'large';

const trimSizeMap = {
  small: 4,
  medium: 7,
  large: 10,
};

const trimAddress = (address: string, trimSize: TrimSizeType = 'small'): string => {
  return `${address.substr(0, trimSizeMap[trimSize])}...${address.substr(
    trimSizeMap[trimSize] * -1,
  )}`;
};

interface CopyClipBoardStyledProps {
  copyIconSize?: string;
}

export interface AddressProps extends CopyClipBoardStyledProps {
  address: string;
  trim?: boolean;
  onCopy?: () => void | Promise<void>;
  size?: TypographyProps['size'];
  component?: TypographyProps['component'];
  trimSize?: TrimSizeType;
  customStyle?: SxProps<Theme>;
}

const CopyClipBoardStyled = styled(CopyToClipboard)<CopyClipBoardStyledProps>`
  padding-top: 0.3rem;
  padding-left: 0.5rem;
  &.MuiSvgIcon-root {
    font-size: ${(props) => props.copyIconSize};
  }
`;

export const Address: React.FC<AddressProps> = ({
  address,
  trim,
  onCopy,
  size = 'subtitle1',
  component = 'span',
  trimSize,
  customStyle,
  copyIconSize = '1rem',
}) => {
  const str = trim ? trimAddress(address, trimSize) : address;
  const [checked, setChecked] = useState(false);
  return (
    <Grid container sx={customStyle}>
      <Grid item>
        <Typography size={size} component={component}>
          {str}
        </Typography>
        <CopyClipBoardStyled
          onCopy={() => {
            onCopy && onCopy();
            setChecked(true);
            setInterval(() => {
              setChecked(false);
            }, 1000);
          }}
          text={address}
          copyIconSize={copyIconSize}
        >
          {!checked ? <FileCopyOutlinedIcon /> : <DoneRoundedIcon />}
        </CopyClipBoardStyled>
      </Grid>
    </Grid>
  );
};
