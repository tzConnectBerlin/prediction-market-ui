import * as React from 'react';
import { useHistory, useParams } from 'react-router';
import { useMarkets } from '../../api/queries';
import { findByMarketId } from '../../api/utils';
import { MarketStateType } from '../../interfaces';
import AuctionPage from '../AuctionPage/AuctionPage';
import MarketPage from '../MarketPage/MarketPage';
import { Loading } from '../../design-system/atoms/Loading';

interface WrapperPageProps {
  marketId: string;
  marketName?: string;
}
const WrapperPage: React.FC = () => {
  const { marketId, marketName } = useParams<WrapperPageProps>();
  const { data, isLoading } = useMarkets();
  const history = useHistory();
  const market = data ? findByMarketId(data, marketId ?? marketName) : undefined;

  if (!market) {
    history.push('/');
    return <></>;
  }
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && market && market.state === MarketStateType.marketBootstrapped && (
        <MarketPage market={market} />
      )}
      {!isLoading && market && market.state === MarketStateType.auctionRunning && (
        <AuctionPage market={market} />
      )}
    </>
  );
};
export default WrapperPage;
