import styled from '@emotion/styled';
import { Theme, useTheme } from '@material-ui/core';
import React from 'react';
import loading from '../../../assets/images/loading.gif';

export interface LoadingProps {
  /**
   * Show size
   */
  size?: 'xs' | 'md' | 'lg';
  hasContainer?: boolean;
}

interface StyledProps {
  theme: Theme;
}

const Styledloading = styled.div<StyledProps>`
  display: inline-block;

  &.xs {
    width: ${({ theme }) => theme.spacing(3)};
    height: ${({ theme }) => theme.spacing(3)};
  }

  &.md {
    width: ${({ theme }) => theme.spacing(6)};
    height: ${({ theme }) => theme.spacing(6)};
  }

  &.lg {
    width: ${({ theme }) => theme.spacing(8)};
    height: ${({ theme }) => theme.spacing(8)};
  }

  img {
    width: 100%;
    height: 100%;
    max-width: ${({ theme }) => theme.spacing(8)};
    max-height: ${({ theme }) => theme.spacing(8)};
  }
`;

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  justify-content: center;
`;

export const Loading: React.FC<LoadingProps> = ({ size = 'lg', hasContainer = true, ...rest }) => {
  const theme = useTheme();

  const Spinner = () => (
    <Styledloading className={size} {...rest} theme={theme}>
      <img src={loading} alt="Loading..." />
    </Styledloading>
  );

  return (
    <>
      {!hasContainer && <Spinner />}
      {hasContainer && (
        <CenterContainer>
          <Spinner />
        </CenterContainer>
      )}
    </>
  );
};
