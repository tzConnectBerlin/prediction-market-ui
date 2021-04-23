import { useMarketCards } from '../../../api/queries';
import { Loading } from '../../atoms/Loading';
import { MarketCardList } from '../../organisms/MarketCardList';

export const MarketCardPage = () => {
  const { data, isLoading } = useMarketCards();
  return (
    <>
      {isLoading && <Loading />}
      {data && <MarketCardList cardList={data} />}
    </>
  );
};
