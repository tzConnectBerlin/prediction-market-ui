import * as React from 'react';
import styled from '@emotion/styled';
import { Card, CardHeader, Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Typography, TypographyProps } from '../../atoms/Typography';
import { TokenType } from '../../../interfaces';

interface StyledLabelProps {
  icon?: string;
  fontColor?: string;
}

const StyledGrid = styled(Grid)`
  font-size: 0.8em;
  padding: 1em;
  margin-top: auto;
`;

const StyledLabel = styled.div<StyledLabelProps>`
  color: ${({ fontColor }) => fontColor};
  padding: 0.2em;
  &.hasIcon {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    & > * {
      margin-left: 0.2em;
    }
  }
`;

const StyledCard = styled(Card)`
  margin: 1em;
  width: 20em;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;
const StyledTitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 0.3em 0;
`;

export interface SkeletonCardProps {
  onClick?: () => void | Promise<void>;
  labelList?: (TokenType | string)[];
  titleSize?: TypographyProps['size'];
}

const defaultTitleSize = 'h2';

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  labelList,
  onClick,
  titleSize = defaultTitleSize,
}) => {
  const theme = useTheme();
  const { t } = useTranslation('common');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const innerLabelList = React.useMemo(() => {
    if (labelList) {
      return labelList;
    }
    return [t(TokenType.yes), t(TokenType.no), t('weekly'), t('liquidity')];
  }, [labelList, t]);
  return (
    <StyledCard onClick={onClick}>
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        title={
          <>
            <Grid
              container
              direction="row"
              spacing={1}
              justifyContent={isMobile ? 'center' : 'inherit'}
            >
              <Grid item flexGrow={1}>
                <Skeleton />
              </Grid>
            </Grid>
            <StyledTitle>
              <Typography size={titleSize} fontWeight="bold">
                <Skeleton />
              </Typography>
            </StyledTitle>
          </>
        }
      />

      <StyledGrid container spacing={1}>
        <Grid container item xs={12} spacing={2}>
          {innerLabelList.map((item, i) => (
            <Grid item xs={6} key={i}>
              <StyledLabel fontColor={theme.palette.text.secondary}>
                <Typography size="h4">{item}</Typography>
              </StyledLabel>
              <StyledLabel>
                <Typography size="h3">
                  <Skeleton />
                </Typography>
              </StyledLabel>
            </Grid>
          ))}
        </Grid>
      </StyledGrid>
    </StyledCard>
  );
};
