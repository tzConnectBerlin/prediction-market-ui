import * as React from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import { useMarkets } from '../../api/queries';
import { findByMarketId } from '../../api/utils';
import { MarketStateType } from '../../interfaces';
import AuctionPage from '../AuctionPage/AuctionPage';
import MarketPage from '../MarketPage/MarketPage';

interface WrapperPageProps {
  marketId: string;
  marketName?: string;
}
const WrapperPage: React.FC = () => {
  const { marketId, marketName } = useParams<WrapperPageProps>();
  const { data } = useMarkets();
  const history = useHistory();
  const market = data ? findByMarketId(data, marketId ?? marketName) : undefined;
  const [page, setPage] = React.useState<'market' | 'auction' | 'redirect' | null>(null);
  const cardLink = market?.question.toLowerCase().replaceAll(' ', '-').replaceAll('?', '');

  React.useEffect(() => {
    if (cardLink && marketName !== cardLink) {
      history.push(`/${marketId ?? marketName}/${cardLink}`);
    }
    if (market?.state === MarketStateType.marketBootstrapped) {
      setPage('market');
    }
    if (market?.state === MarketStateType.auctionRunning) {
      setPage('auction');
    }
    if (!market && data) {
      setPage('redirect');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, market, data]);

  if (page === 'market') {
    return <MarketPage />;
  }
  if (page === 'auction') {
    return <AuctionPage />;
  }
  if (page === 'redirect') {
    return <Redirect to="/" />;
  }
  return <></>;
};
export default WrapperPage;
