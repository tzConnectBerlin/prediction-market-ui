import React, { useEffect } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useMarketCards } from '../../../api/queries';
import { initMarketContract } from '../../../contracts/Market';
import { useMarketPathParams } from '../../../hooks/market';
import { ENABLE_SAME_MARKETS, ENABLE_SIMILAR_MARKETS } from '../../../utils/globals';
import { MainPage } from '../MainPage';
import { Loading } from '../../atoms/Loading';
import { MarketCardList } from '../../organisms/MarketCardList';

type MarketPageProps = WithTranslation;

export const MarketCardPageComponent: React.FC<MarketPageProps> = ({ t }) => {
  const { data, isLoading } = useMarketCards();
  const { marketAddress } = useMarketPathParams();

  const getPageTitle = (): string | undefined => {
    if (ENABLE_SAME_MARKETS || ENABLE_SIMILAR_MARKETS) {
      return marketAddress;
    }
  };
  const title = getPageTitle();

  useEffect(() => {
    marketAddress && initMarketContract(marketAddress);
  }, [marketAddress]);

  return (
    <MainPage title={title ? t(`${title}`) : undefined}>
      {isLoading && <Loading />}
      {data && <MarketCardList cardList={data} />}
    </MainPage>
  );
};

export const MarketCardPage = withTranslation(['common'])(MarketCardPageComponent);
