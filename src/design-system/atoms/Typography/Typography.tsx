import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import {
  Typography as MaterialTypography,
  TypographyProps as MaterialTypographyProps,
} from '@material-ui/core';
import { FontSize } from '../../../interfaces';

const checkIfTruncated = (element: HTMLSpanElement) => element.scrollHeight > element.clientHeight;
export interface TypographyProps extends Omit<MaterialTypographyProps, 'variant'> {
  size?: FontSize | string;
  margin?: string;
  component?: unknown; // TODO: extract from material-ui props
  truncate?: boolean;
  truncateAfter?: number;
  isTruncated?: (value: boolean) => void | Promise<void>;
}

interface IStyledTypography {
  fontSize?: string;
  margin?: string;
  lines?: number;
}

const StyledTypography = styled(MaterialTypography)<IStyledTypography>`
  font-size: ${({ fontSize }) => fontSize};
  margin: ${({ margin }) => margin};
  &.truncate {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${({ lines }) => lines};
  }
`;

const defaultTruncate = false;
const defaultTruncateAfter = 3;

export const Typography: React.FC<TypographyProps> = ({
  size,
  children,
  truncate = defaultTruncate,
  truncateAfter = defaultTruncateAfter,
  className,
  isTruncated,
  ...rest
}) => {
  const fontSize = size && (size.includes('em') || size.includes('px')) ? size : undefined;
  const variant = (size && !fontSize ? size : 'body1') as MaterialTypographyProps['variant'];
  const classes = truncate ? [className, 'truncate'] : [className];
  const ref = React.createRef<HTMLSpanElement>();
  useEffect(() => {
    // TODO: find a better way than set timeout
    setTimeout(() => {
      if (ref.current && isTruncated) {
        isTruncated(checkIfTruncated(ref.current));
      }
    }, 100);
  }, [ref, isTruncated]);
  return (
    <StyledTypography
      className={classes.join(' ')}
      fontSize={fontSize as any}
      variant={variant}
      lines={truncateAfter}
      ref={ref}
      {...rest}
    >
      {children}
    </StyledTypography>
  );
};
