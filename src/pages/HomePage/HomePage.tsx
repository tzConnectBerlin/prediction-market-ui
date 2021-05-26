import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useMarkets } from '../../api/queries';
import { MainPage } from '../MainPage/MainPage';
import { Loading } from '../../design-system/atoms/Loading';
import { MarketCardList } from '../../design-system/organisms/MarketCardList';
import { Toolbar } from '../../design-system/organisms/Toolbar';

type MarketPageProps = WithTranslation;

const filterData = [
  {
    label: 'Open',
    value: 1,
  },
  {
    label: 'Closed',
    value: 2,
  },
  {
    label: 'Investment Phase',
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

  return (
    <MainPage>
      <Toolbar
        filterItems={filterData}
        sortItems={sortData}
        onFilterSelect={() => {}}
        onSearchChange={() => {}}
        onSortSelect={() => {}}
      />
      {isLoading && <Loading />}
      {data && <MarketCardList cardList={data} />}
    </MainPage>
  );
};

const HomePage = withTranslation(['common', 'create-market'])(HomePageComponent);
export default HomePage;
