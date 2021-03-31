import React, { useEffect, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { Typography } from '../../atoms/Typography';
import { MainPage } from '../MainPage';
import { AccountCardList } from '../../organisms/AccountCardList';
import { AccountCardProps } from '../../molecules/AccountCard';
import { ENABLE_SAME_MARKETS, ENABLE_SIMILAR_MARKETS } from '../../../utils/globals';
import { useSimilarContracts, useSameContracts } from '../../../api/queries';

type SimilarMarketsPageProps = WithTranslation;

const SimilarMarketsPageComponent: React.FC<SimilarMarketsPageProps> = ({ t }) => {
  const [accountList, setAccountList] = useState<AccountCardProps[]>([]);
  const history = useHistory();

  const ManagerComponent: React.FC<{ manager: string }> = ({ manager }) => (
    <Typography size="body2" color="textSecondary" component="p">
      {t('manager')}: {manager}
    </Typography>
  );

  const { data: similarContractData, isLoading } = useSimilarContracts();
  const { data: sameMarketsData } = useSameContracts();

  useEffect(() => {
    const data = [
      ...(sameMarketsData?.contracts ? sameMarketsData?.contracts : []),
      ...(similarContractData?.contracts ? similarContractData?.contracts : []),
    ];

    if (data.length) {
      const accList: AccountCardProps[] = data.map(({ address, timestamp, manager }) => {
        return {
          address,
          timestamp,
          content: manager ? <ManagerComponent manager={manager} /> : undefined,
          onClick: () => history.push(`/market/${address}`),
        };
      });
      setAccountList(accList);
    }
  }, [sameMarketsData, similarContractData]);

  if (!ENABLE_SAME_MARKETS && !ENABLE_SIMILAR_MARKETS) {
    history.push('/');
    return <></>;
  }

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
