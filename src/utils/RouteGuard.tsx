import { LocationDescriptorObject } from 'history';
import { useState } from 'react';
import { useStore } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { QuestionMetaData, QuestionEntryMDW } from '../interfaces';
import { RootState } from '../redux/rootReducer';
import { useWallet } from '../wallet/hooks';

interface RouteGuardProps {
  checkRouteAvailability?: boolean;
  walletRequired?: boolean;
  stateGuard?: (state: RootState, userAddress?: string) => boolean;
  locationGuard?: <T>(locationState: T, userAddress?: string) => boolean;
  fallbackPath?: LocationDescriptorObject;
}

interface QuestionPagePathParams {
  marketAddress: string;
  questionHash: string;
}

interface QuestionPageLocationParams extends QuestionMetaData, QuestionEntryMDW {
  participants?: string[];
}

const useAvailableRoutes = () => {
  const {
    wallet: { pkh: userAddress },
  } = useWallet();
  const { state } = useLocation<QuestionPageLocationParams>();
  const { marketAddress, questionHash } = useParams<QuestionPagePathParams>();
  const { owner, auctionEndDate, marketCloseDate, participants, auction_bids: auctionBids } = state;
  const currentDate = new Date();
  const auctionDate = new Date(auctionEndDate);
  const marketEndDate = new Date(marketCloseDate);

  if (userAddress && marketAddress && questionHash) {
    const allowedRoutes: string[] = [];

    if (currentDate <= auctionDate) {
      allowedRoutes.push(`/market/${marketAddress}/question/${questionHash}/submit-bid`);
    }

    if (currentDate > auctionDate && currentDate <= marketEndDate) {
      owner === userAddress &&
        allowedRoutes.push(`/market/${marketAddress}/question/${questionHash}/close-auction`);
      auctionBids &&
        userAddress &&
        Object.keys(auctionBids).includes(userAddress) &&
        allowedRoutes.push(`/market/${marketAddress}/question/${questionHash}/withdraw-auction`);
      allowedRoutes.push(`/market/${marketAddress}/question/${questionHash}/buy-token`);
    }

    if (currentDate > marketEndDate && userAddress && participants?.includes(userAddress)) {
      allowedRoutes.push(`/market/${marketAddress}/question/${questionHash}/claim-winnings`);
    }
    return allowedRoutes;
  }

  return [];
};

export function withRouteGuard({
  checkRouteAvailability = false,
  fallbackPath,
  stateGuard,
  locationGuard,
  walletRequired,
}: RouteGuardProps) {
  // eslint-disable-next-line react/display-name
  return (WrappedComponent: React.ComponentType<any>) => (props: any) => {
    const history = useHistory();
    const {
      wallet: { pkh },
    } = useWallet();
    const fallback = fallbackPath || '/';
    const { getState } = useStore<RootState>();
    const [locationResult, setLocationResult] = useState(false);
    const { state } = useLocation<unknown>();
    const allowedRoutes = useAvailableRoutes();
    if (walletRequired && !pkh) {
      history.push(fallback);
      return <></>;
    }

    if (checkRouteAvailability && allowedRoutes.length === 0) {
      history.push(fallback);
      return <></>;
    }

    if (locationGuard) {
      const isValid = locationGuard(state, pkh);
      if (!stateGuard || !isValid) {
        history.push(fallback);
        return <></>;
      }
      stateGuard && setLocationResult(isValid);
    }
    if (stateGuard) {
      const appState = getState();
      const isValid = stateGuard(appState);
      if (!isValid) {
        history.push(fallback);
        return <></>;
      }
      if (locationGuard && (!locationResult || !isValid)) {
        history.push(fallback);
        return <></>;
      }
    }

    return <WrappedComponent {...props} />;
  };
}
