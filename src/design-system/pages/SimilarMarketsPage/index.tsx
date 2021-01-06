import React, { useEffect, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';
import { CircularProgress } from '@material-ui/core';
import { getSimilarContracts } from '../../../api/bcd';
import { Typography } from '../../atoms/Typography';
import { MainPage } from '../MainPage';
import { AccountCardList } from '../../organisms/AccountCardList';
import { AccountCardProps } from '../../molecules/AccountCard';
import { SimilarContractResponse } from '../../../interfaces/bcd';

type SimilarMarketsPageProps = WithTranslation;

const SimilarMarketsPageComponent: React.FC<SimilarMarketsPageProps> = ({ t }) => {
  const [accountList, setAccountList] = useState<AccountCardProps[]>([]);
  const history = useHistory();

  const { data, isLoading } = useQuery<
    SimilarContractResponse,
    AxiosError,
    SimilarContractResponse
  >('similarMarkets', () => {
    return getSimilarContracts();
  });

  const ManagerComponent: React.FC<{ manager: string }> = ({ manager }) => (
    <Typography size="body2" color="textSecondary" component="p">
      {t('manager')}: {manager}
    </Typography>
  );

  useEffect(() => {
    if (data) {
      const accList: AccountCardProps[] = !data.contracts
        ? []
        : data?.contracts?.map(({ address, timestamp, manager }) => {
            return {
              address,
              timestamp,
              content: manager ? <ManagerComponent manager={manager} /> : undefined,
              onClick: () => history.push(`/market/${address}`),
            };
          });
      setAccountList(accList);
    }
  }, [data]);
  return (
    <MainPage title={`${t('similarMarkets')}`}>
      {isLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        <AccountCardList list={accountList || []} />
      )}
    </MainPage>
  );
};

export const SimilarMarketsPage = withTranslation(['common'])(SimilarMarketsPageComponent);
