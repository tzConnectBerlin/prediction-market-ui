import * as React from 'react';
import styled from '@emotion/styled';
import { Paper, Grid, useTheme, useMediaQuery, Link } from '@material-ui/core';
import { Typography } from '../../atoms/Typography';
import { ExpandText, ExpandTextProps } from '../ExpandText/ExpandText';
import { openInNewTab } from '../../../utils/misc';

interface MarketCardItem {
  title: string;
  item: string | ExpandTextProps;
}

export interface MarketDetailCardProps {
  title: string;
  items: MarketCardItem[];
}

const PaperWrapperStyled = styled(Paper)`
  padding: 2rem;
`;

export const MarketDetailCard: React.FC<MarketDetailCardProps> = ({ title, items }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <PaperWrapperStyled>
      <Typography size="h2" fontWeight="bold">
        {title}
      </Typography>
      <Grid container direction="column" alignContent="flex-start" spacing="2" pb="1rem">
        {items.map((data, index) => {
          const key = typeof data.item === 'string' ? data.item : data.item.text;
          return (
            <Grid item mt="2rem" key={`${key}-${index}`} width="100%">
              <Typography size="body1" fontWeight="bold" mb="0.75rem">
                {data.title}
              </Typography>
              {typeof data.item === 'string' ? (
                data.title === 'Adjudicator' ? (
                  <Typography
                    color="primary"
                    component={Link}
                    className="pointer"
                    onClick={() => {
                      openInNewTab(`https://granada.tzstats.com/${data.item}`);
                    }}
                  >
                    {isMobile
                      ? `${data.item?.substring(0, 10)}...${data.item?.substring(
                          data.item?.length - 10,
                        )}`
                      : data.item}
                  </Typography>
                ) : (
                  <Typography>{data.item}</Typography>
                )
              ) : (
                <ExpandText {...data.item} />
              )}
            </Grid>
          );
        })}
      </Grid>
    </PaperWrapperStyled>
  );
};
