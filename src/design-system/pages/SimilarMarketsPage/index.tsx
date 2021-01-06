import React, { useEffect, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { getSimilarContracts } from '../../../api/bcd';
import { Typography } from '../../atoms/Typography';
import { MainPage } from '../MainPage';
import { AccountCardList } from '../../organisms/AccountCardList';
import { AccountCardProps } from '../../molecules/AccountCard';

type SimilarMarketsPageProps = WithTranslation;

const SimilarMarketsPageComponent: React.FC<SimilarMarketsPageProps> = ({ t }) => {
  const [data, setData] = useState<AccountCardProps[]>([]);
  const history = useHistory();
  const ManagerComponent: React.FC<{ manager: string }> = ({ manager }) => (
    <Typography size="body2" color="textSecondary" component="p">
      {t('manager')}: {manager}
    </Typography>
  );

  useEffect(() => {
    getSimilarContracts().then((response) => {
      const accountList: AccountCardProps[] = !response.contracts
        ? []
        : response?.contracts?.map(({ address, timestamp, manager }) => {
            return {
              address,
              timestamp,
              content: manager ? <ManagerComponent manager={manager} /> : undefined,
              onClick: () => history.push(`/market/${address}`),
            };
          });
      setData(accountList);
    });
  }, []);
  return (
    <MainPage title={`${t('similarMarkets')}`}>
      {data.length > 0 && <AccountCardList list={data || []} />}
    </MainPage>
  );
};

export const SimilarMarketsPage = withTranslation(['common'])(SimilarMarketsPageComponent);
