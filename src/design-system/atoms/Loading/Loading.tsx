import styled from '@emotion/styled';
import loading from '../../../assets/images/loading.gif';
import { theme } from '../../../theme';

export interface LoadingProps {
  /**
   * Show size
   */
  size?: 'xs' | 'md' | 'lg';
}

const Styledloading = styled.div`
  display: inline-block;

  &.xs {
    width: ${theme.spacing(3)};
    height: ${theme.spacing(3)};
  }

  &.md {
    width: ${theme.spacing(6)};
    height: ${theme.spacing(6)};
  }

  &.lg {
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
  }

  img {
    width: 100%;
    height: 100%;
    max-width: ${theme.spacing(8)};
    max-height: ${theme.spacing(8)};
  }
`;

export const Loading: React.FC<LoadingProps> = ({ size = 'lg', ...rest }) => {
  return (
    <Styledloading className={size}>
      <img src={loading} alt="Loading..." />
    </Styledloading>
  );
};
