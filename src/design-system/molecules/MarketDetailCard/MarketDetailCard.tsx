import * as React from 'react';
import styled from '@emotion/styled';
import {
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
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
  padding: 1.5rem;
`;

const defaultAccordionPadding = { paddingY: '0.5rem' };
const defaultDetailsPadding = { paddingTop: '0.25rem' };

export const MarketDetailCard: React.FC<MarketDetailCardProps> = ({ title, items }) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const titleHeader = (
    <Typography size="h2" fontWeight="bold">
      {title}
    </Typography>
  );

  const bodyContent = (
    <Grid container direction="column" alignContent="flex-start" spacing="2" pb="1rem">
      {items.map((data, index) => {
        const key = typeof data.item === 'string' ? data.item : data.item.text;
        return (
          <Grid
            item
            mt={(isTablet || isMobile) && index === 0 ? 0 : '2rem'}
            key={`${key}-${index}`}
            width="100%"
          >
            <Typography size="body1" fontWeight="bold" mb="0.75rem">
              {data.title}
            </Typography>
            {typeof data.item === 'string' ? (
              data.title === 'Adjudicator' ? (
                <Typography
                  color="primary"
                  className="pointer"
                  onClick={() => {
                    openInNewTab(data.item as string);
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
  );

  return isTablet ? (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="market-details"
        id="market-header"
        sx={defaultAccordionPadding}
      >
        {titleHeader}
      </AccordionSummary>
      <AccordionDetails sx={defaultDetailsPadding}>{bodyContent}</AccordionDetails>
    </Accordion>
  ) : (
    <PaperWrapperStyled>
      {titleHeader}
      {bodyContent}
    </PaperWrapperStyled>
  );
};
