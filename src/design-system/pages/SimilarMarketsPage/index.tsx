import { Card, CardContent, CardHeader, IconButton } from '@material-ui/core';
import styled from '@emotion/styled';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { getSimilarContracts } from '../../../api/bcd';
import { SimilarContract, SimilarContractResponse } from '../../../interfaces/bcd';
import { Identicon } from '../../atoms/Identicon';
import { Typography } from '../../atoms/Typography';
import { MainPage } from '../MainPage';

type SimilarMarketsPageProps = WithTranslation;

const StyledCard = styled(Card)`
  margin: 1em;
`;

const ContractCard: React.FC<SimilarContract> = ({ address, timestamp, manager }) => {
  return (
    <StyledCard>
      <CardHeader
        avatar={<Identicon seed={address} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={address}
        subheader={timestamp ? format(new Date(timestamp), 'dd MMM yyyy hh:mm:ss aaaa') : timestamp}
      />
      <CardContent>
        <Typography size="body2" color="textSecondary" component="p">
          Manager: {manager}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

const ContractCardList: React.FC<{ data: SimilarContract[] }> = ({ data = [] }) => {
  return (
    <>
      {data.length > 0 &&
        data.map((item) => {
          return <ContractCard key={item.hash} {...item} />;
        })}
    </>
  );
};

const SimilarMarketsPageComponent: React.FC<SimilarMarketsPageProps> = ({ t }) => {
  const [data, setData] = useState<SimilarContractResponse>();

  useEffect(() => {
    getSimilarContracts().then((response) => {
      setData(response);
    });
  }, []);
  return (
    <MainPage title={`${t('similarMarkets')}`}>
      {data && <ContractCardList data={data.contracts || []} />}
    </MainPage>
  );
};

export const SimilarMarketsPage = withTranslation(['common'])(SimilarMarketsPageComponent);
