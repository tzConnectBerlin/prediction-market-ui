import React, { useEffect, useState } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useMarkets } from '../../api/queries';
import { MainPage } from '../MainPage/MainPage';
import { Loading } from '../../design-system/atoms/Loading';
import { MarketCardList } from '../../design-system/organisms/MarketCardList';
import { Toolbar } from '../../design-system/organisms/Toolbar';
import { getOpenMarkets, getClosedMarkets, getAuctions } from '../../api/utils';

type MarketPageProps = WithTranslation;

const filterData = [
  {
    label: 'All',
    value: 0,
  },
  {
    label: 'Open',
    value: 1,
  },
  {
    label: 'Closed',
    value: 2,
  },
  {
    label: 'Auction Phase',
    value: 3,
  },
];

const sortData = [
  {
    label: 'Volume',
    value: 1,
  },
  {
    label: 'Liquidity',
    value: 2,
  },
  {
    label: 'End Date',
    value: 3,
  },
];

export const HomePageComponent: React.FC<MarketPageProps> = () => {
  const { data, isLoading } = useMarkets();
  const [markets, setMarkets] = useState(data);

  useEffect(() => {
    setMarkets(data);
  }, [data]);

  const handleFilterSelect = (value: number) => {
    if (data) {
      let filteredMarkets = data;
      if (value === 1) {
        filteredMarkets = getOpenMarkets(data);
      } else if (value === 2) {
        filteredMarkets = getClosedMarkets(data);
      } else if (value === 3) {
        filteredMarkets = getAuctions(data);
      }
      setMarkets(filteredMarkets);
    }
  };

  return (
    <MainPage>
      <Toolbar
        filterItems={filterData}
        sortItems={sortData}
        onFilterSelect={handleFilterSelect}
        onSearchChange={(e: any) => {
          console.log(e);
        }}
        onSortSelect={(e: any) => {
          console.log(e);
        }}
      />
      {isLoading && <Loading />}
      {markets && <MarketCardList cardList={markets} />}
    </MainPage>
  );
};

const HomePage = withTranslation(['common', 'create-market'])(HomePageComponent);
export default HomePage;
