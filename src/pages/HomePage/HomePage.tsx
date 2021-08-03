import React, { useEffect, useState } from 'react';
import { useLottie } from 'lottie-react';
import { useTranslation, WithTranslation, withTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import NotFoundLottie from '../../lottie/not-found.json';
import { useMarkets } from '../../api/queries';
import { MainPage } from '../MainPage/MainPage';
import { Loading } from '../../design-system/atoms/Loading';
import { MarketCardList } from '../../design-system/organisms/MarketCardList';
import { Toolbar } from '../../design-system/organisms/Toolbar';
import { getOpenMarkets, getClosedMarkets, getAuctions, searchMarket } from '../../api/utils';

type MarketPageProps = WithTranslation;

const filterData = [
  {
    label: 'All',
    value: 0,
  },
  {
    label: 'Trading',
    value: 1,
  },
  {
    label: 'Resolved Markets',
    value: 2,
  },
  {
    label: 'Pre-trading',
    value: 3,
  },
];

const NotFound = () => {
  const { View } = useLottie({
    animationData: NotFoundLottie,
    loop: true,
    autoplay: true,
  });

  return View;
};

export const HomePageComponent: React.FC<MarketPageProps> = () => {
  const { data, isLoading, isFetching } = useMarkets();
  const [filter, setSelectedFilter] = useState(0);
  const [markets, setMarkets] = useState(data);
  useEffect(() => {
    setMarkets(data);
  }, [data]);

  const handleFilterSelect = (value: number, marketData = data) => {
    if (data) {
      let filteredMarkets = data;
      if (value === 1) {
        filteredMarkets = getOpenMarkets(data);
      } else if (value === 2) {
        filteredMarkets = getClosedMarkets(data);
      } else if (value === 3) {
        filteredMarkets = getAuctions(data);
      }
      setSelectedFilter(value);
      setMarkets(filteredMarkets);
    }
  };
  const handleSearch = (e: any) => {
    const search: string = e.target.value;
    if (search.length >= 3 && markets) {
      const filtered = searchMarket(markets, search);
      setMarkets(filtered);
    } else {
      handleFilterSelect(filter);
    }
  };

  return (
    <MainPage>
      <Toolbar
        filterItems={filterData}
        onFilterSelect={handleFilterSelect}
        onSearchChange={handleSearch}
        defaultFilterValue={0}
      />
      {isLoading && <Loading />}
      {markets && <MarketCardList cardList={markets} />}
      {(!markets || markets.length === 0) && !isFetching && (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} maxWidth="50%">
            <NotFound />
          </Grid>
        </Grid>
      )}
    </MainPage>
  );
};

const HomePage = withTranslation(['common', 'create-market'])(HomePageComponent);
export default HomePage;
