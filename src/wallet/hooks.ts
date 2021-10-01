import { useBeaconWallet, useWallet } from '@tezos-contrib/react-wallet-provider';
import TorusSdk from '@toruslabs/torus-direct-web-sdk';
import * as React from 'react';
import { TORUS_ENABLED, TORUS_NETWORK } from '../globals';
import { useStore } from '../store/store';

const useMockBeaconWallet = () => {
  return undefined;
};

export const useTorusSDK = () => {
  const [sdk, setSDK] = React.useState<any>(null);
  React.useEffect(() => {
    const initSDK = async () => {
      if (sdk === null) {
        const torusDirectSdk = new TorusSdk({
          baseUrl: `${window.location.origin}/serviceworker`,
          enableLogging: process.env.NODE_ENV === 'development',
          network: TORUS_NETWORK as any,
        });

        await torusDirectSdk.init({ skipSw: true });
        setSDK(torusDirectSdk);
      }
    };
    initSDK();
  }, []);
  return sdk;
};

export const useConditionalWallet = TORUS_ENABLED ? useStore : useWallet;
export const useConditionalBeaconWallet = TORUS_ENABLED ? useMockBeaconWallet : useBeaconWallet;
