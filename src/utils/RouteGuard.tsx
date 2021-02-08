import { LocationDescriptorObject } from 'history';
import { useState } from 'react';
import { useStore } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { RootState } from '../redux/rootReducer';
import { useWallet } from '../wallet/hooks';

interface RouteGuardProps {
  walletRequired?: boolean;
  stateGuard?: (state: RootState) => boolean;
  locationGuard?: <T>(locationState: T) => boolean;
  fallbackPath?: LocationDescriptorObject;
}

export function withRouteGuard({
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

    if (walletRequired && !pkh) {
      history.push(fallback);
      return <></>;
    }

    if (locationGuard) {
      const isValid = locationGuard(state);
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
