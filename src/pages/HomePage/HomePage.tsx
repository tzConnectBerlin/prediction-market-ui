import React, { useEffect, useState } from 'react';
import { useLottie } from 'lottie-react';
import { Trans, useTranslation, WithTranslation, withTranslation } from 'react-i18next';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NotFoundLottie from '../../lottie/not-found.json';
import { useMarkets } from '../../api/queries';
import { MainPage } from '../MainPage/MainPage';
import { Loading } from '../../design-system/atoms/Loading';
import { MarketCardList } from '../../design-system/organisms/MarketCardList';
import { Toolbar } from '../../design-system/organisms/Toolbar';
import { getOpenMarkets, getClosedMarkets, getAuctions, searchMarket } from '../../api/utils';
import { Market } from '../../interfaces';
import { useStore } from '../../store/store';
import { NotificationBanner } from '../../design-system/molecules/NotificationBanner';
import { questionToURL } from '../../utils/misc';
import { TwitterShare } from '../../design-system/atoms/TwitterShare';
import { PhaseIcon } from '../../design-system/atoms/PhaseIcon';

type MarketPageProps = WithTranslation;

const filterData = [
  {
    label: 'All Phases',
    value: 0,
  },
  {
    label: 'Pre-trading',
    value: 3,
    startIcon: <PhaseIcon />,
  },
  {
    label: 'Trading',
    value: 1,
    startIcon: <PhaseIcon variant="secondary" />,
  },
  {
    label: 'Resolved',
    value: 2,
    startIcon: <PhaseIcon variant="tertiary" />,
  },
];

const sortData = [
  {
    label: 'Newest',
    value: 0,
  },
  {
    label: 'Liquidity',
    value: 1,
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

const getNormalizedLQT = (lqt: string | number = 0): number => {
  return typeof lqt === 'string' ? 0 : lqt;
};

export const HomePageComponent: React.FC<MarketPageProps> = () => {
  const { data: markets, isLoading } = useMarkets();
  const { t } = useTranslation('common');
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [displayedMarkets, setDisplayedMarkets] = useState<Market[] | undefined>([]);
  const [newCreatedMarkets, setNewMarkets] = useState<Market[]>([]);
  const { pendingMarketIds, setPendingMarketIds, filter, sort, setFilter, setSort } = useStore(
    (state) => state,
  );
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (markets) {
      const marketIds = pendingMarketIds.reduce(
        (acc, id) => {
          const index = markets.findIndex((o) => Number(o.marketId) === id);
          if (index === -1) {
            acc.pendingMarkets.push(id);
          } else {
            acc.newCreatedMarkets.push(markets[index]);
          }
          return acc;
        },
        {
          pendingMarkets: new Array<number>(),
          newCreatedMarkets: new Array<Market>(),
        },
      );
      setNewMarkets(marketIds.newCreatedMarkets);
      setPendingMarketIds(marketIds.pendingMarkets);
    }
  }, [markets]);

  const doFilter = (value: number, marketData = markets) => {
    if (marketData) {
      let filteredMarkets = marketData;
      if (value === 1) {
        filteredMarkets = getOpenMarkets(marketData);
      } else if (value === 2) {
        filteredMarkets = getClosedMarkets(marketData);
      } else if (value === 3) {
        filteredMarkets = getAuctions(marketData);
      }
      setFilter(value);
      return filteredMarkets;
    }
  };

  const doSearch = (search: string, marketData = displayedMarkets) => {
    let filtered = marketData;
    if (search.length >= 3 && marketData) {
      filtered = searchMarket(marketData, search);
      setSearchQuery(search);
    } else {
      filtered = doFilter(filter);
      setSearchQuery(undefined);
    }
    return filtered;
  };

  const doSort = (value: number, marketData = markets) => {
    let filtered = marketData;
    if (filtered) {
      if (value === 0) {
        filtered = filtered.sort((a, b) => Number(b.marketId) - Number(a.marketId));
      }
      if (value === 1) {
        filtered = filtered.sort(
          (a, b) => getNormalizedLQT(b.liquidity) - getNormalizedLQT(a.liquidity),
        );
      }
    }
    return filtered;
  };

  const handleSearch = (e: any) => {
    const search: string = e.target.value;
    const marketData = filter && displayedMarkets ? displayedMarkets : markets;
    doSearch(search, marketData);
  };

  const handleFilterSelect = (value: number) => {
    const marketData = searchQuery && displayedMarkets ? displayedMarkets : markets;
    doFilter(value, marketData);
  };

  const handleSort = (value: number) => {
    const marketData = searchQuery && displayedMarkets ? displayedMarkets : markets;
    doSort(value, marketData);
    setSort(value);
  };

  useEffect(() => {
    let newMarkets = markets;
    if (filter > 0) {
      newMarkets = doFilter(filter, markets);
      setDisplayedMarkets(newMarkets);
    }
    if (searchQuery) {
      newMarkets = doSearch(searchQuery, newMarkets);
    }
    newMarkets = doSort(sort, newMarkets);
    setDisplayedMarkets(newMarkets);
  }, [markets, filter, searchQuery, sort]);

  return (
    <MainPage>
      {newCreatedMarkets &&
        newCreatedMarkets.map((market) => {
          const marketPath = `/market/${market.marketId}/${questionToURL(market.question)}`;
          return (
            <NotificationBanner open key={market.marketId}>
              <Grid container direction="column" spacing={0}>
                <Grid item xs={12}>
                  <Trans
                    i18nKey="marketCreatedMessage"
                    t={t}
                    components={[<Link to={marketPath} key={marketPath} />]}
                  />
                </Grid>
                <Grid item width={isMobile ? '100%' : '30%'}>
                  <TwitterShare
                    title={t('spreadTheWord')}
                    text={`${t('twitterShareMessage')} ${window.location.protocol}//${
                      window.location.hostname
                    }${marketPath}`}
                    color="grey"
                  />
                </Grid>
              </Grid>
            </NotificationBanner>
          );
        })}
      <Toolbar
        filterItems={filterData}
        sortItems={sortData}
        onFilterSelect={handleFilterSelect}
        onSearchChange={handleSearch}
        defaultFilterValue={filter}
        onSortSelect={handleSort}
        defaultSortValue={sort}
        searchFieldLabel={t('keywordSearch')}
      />
      {isLoading && <Loading />}
      {displayedMarkets && (
        <MarketCardList cardList={displayedMarkets} pending={pendingMarketIds.length} />
      )}
      {(!displayedMarkets || displayedMarkets.length === 0) &&
        pendingMarketIds.length === 0 &&
        typeof markets !== 'undefined' && (
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
