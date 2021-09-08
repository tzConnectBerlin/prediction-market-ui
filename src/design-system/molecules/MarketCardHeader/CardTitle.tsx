import * as React from 'react';
import styled from '@emotion/styled';
import { Typography, TypographyProps } from '../../atoms/Typography';
import { LabelGroup, LabelGroupProps } from './LabelGroup';

export interface CardTitleProps extends LabelGroupProps {
  /**
   * market question
   */
  title: string;
  titleSize?: TypographyProps['size'];
}

const StyledTitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 0.3em 0;
`;

/**
 * TODO: Move to a separate folder
 *
 */

const defaultTitleSize = 'h2';

export const CardTitle: React.FC<CardTitleProps> = ({
  title,
  titleSize = defaultTitleSize,
  cardStateProps,
  ...rest
}) => (
  <>
    <LabelGroup {...rest} cardStateProps={cardStateProps} />
    <StyledTitle>
      <Typography size={titleSize} fontWeight="bold">
        {title}
      </Typography>
    </StyledTitle>
  </>
);
