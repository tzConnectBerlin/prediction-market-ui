import React from 'react';
import styled from '@emotion/styled';
import { Paper, Divider, Grid } from '@material-ui/core';
import { Typography } from '../../atoms/Typography';
import { ExpandText, ExpandTextProps } from '../ExpandText/ExpandText';

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

const DividerStyled = styled(Divider)`
  margin-top: 1rem;
`;

export const MarketDetailCard: React.FC<MarketDetailCardProps> = ({ title, items }) => {
  return (
    <PaperWrapperStyled>
      <Typography size="h2" fontWeight="bold">
        {title}
      </Typography>
      <Grid container direction="column" alignContent="flex-start" spacing="2" p="1rem">
        {items.map((data, index) => {
          const key = typeof data.item === 'string' ? data.item : data.item.text;
          return (
            <Grid item mt="1rem" key={`${key}-${index}`} width="100%">
              <Typography size="h2" color="primary">
                {data.title}
              </Typography>
              {typeof data.item === 'string' && data.title === 'Adjudicator' ? (
                <Typography>{`${data.item?.substring(0, 10)}...${data.item?.substring(
                  data.item?.length - 10,
                )}`}</Typography>
              ) : typeof data.item === 'string' ? (
                <Typography>{data.item}</Typography>
              ) : (
                <ExpandText {...data.item} />
              )}
              {items.length - 1 === index ? undefined : <DividerStyled />}
            </Grid>
          );
        })}
      </Grid>
    </PaperWrapperStyled>
  );
};
