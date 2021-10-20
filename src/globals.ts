import { WalletProviderProps } from '@tezos-contrib/react-wallet-provider';

const network = process.env.REACT_APP_NETWORK_TYPE || 'GRANADANET';

export const APP_NAME = process.env.REACT_APP_APP_NAME || 'Prediction Market';
export const NETWORK: WalletProviderProps['network'] = network as WalletProviderProps['network'];
export const MARKET_ADDRESS = process.env.REACT_APP_MARKET_CONTRACT || '';
export const FA12_CONTRACT = process.env.REACT_APP_FA12_CONTRACT || '';
export const RPC_URL = process.env.REACT_APP_RPC_URL || 'https://granadanet.smartpy.io';
export const RPC_PORT = process.env.REACT_APP_RPC_PORT || 443;
export const IPFS_POST_API = process.env.REACT_APP_IPFS_POST_API;
export const IPFS_GET_API = process.env.REACT_APP_IPFS_GET_API;
export const GRAPHQL_API = process.env.REACT_APP_GRAPHQL_API || '';
export const DATETIME_FORMAT = {
  LONG_FORMAT: 'PPPPpppp',
  MEDIUM_FORMAT: 'do MMM yyyy HH:mm',
  SHORT_FORMAT: 'do MMM yyyy',
  INPUT_FORMAT: 'dd/MM/yyyy',
};
export const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
export const CURRENCY_SYMBOL = process.env.REACT_APP_FA12_SYMBOL || 'PMM';
export const ENABLE_MARKET_CREATION =
  process.env.REACT_APP_ENABLE_MARKET_CREATION === 'true' || false;
export const WERT_PARTNER_ID = process.env.REACT_APP_WERT_PARTNER_ID;
export const TORUS_ENABLED = process.env.REACT_APP_TORUS_ENABLED === 'true';
export const AUTH_URL = process.env.REACT_APP_AUTH_URL;
export const AUTH_SCOPE = process.env.REACT_APP_AUTH_SCOPE ?? 'publicData';
export const AUTH_REDIRECT_URL = process.env.REACT_APP_AUTH_REDIRECT_URL;
export const AUTH_CLIENT_ID = process.env.REACT_APP_AUTH_CLIENT_ID;
export const TORUS_NETWORK = process.env.REACT_APP_TORUS_NETWORK ?? 'testnet';
export const TORUS_PROVIDER = process.env.REACT_APP_TORUS_PROVIDER;
export const MARKET_CRREATION = process.env.REACT_APP_MARKET_CREATOR;

export const SLIPPAGE = 5;
export const DEADLINE = 30;
