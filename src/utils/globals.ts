import { WalletProviderProps } from '@tz-contrib/react-wallet-provider';

const network = process.env.REACT_APP_NETWORK_TYPE || 'FLORENCENET';

export const APP_NAME = process.env.REACT_APP_APP_NAME || 'Prediction Market';
export const NETWORK: WalletProviderProps['network'] = network as WalletProviderProps['network'];
export const MARKET_ADDRESS = process.env.REACT_APP_MARKET_CONTRACT || '';
export const FA12_CONTRACT = process.env.REACT_APP_FA12_CONTRACT || '';
export const RPC_URL = process.env.REACT_APP_RPC_URL || 'https://florencenet.smartpy.com';
export const RPC_PORT = process.env.REACT_APP_RPC_PORT || 443;
export const IPFS_POST_API = process.env.REACT_APP_IPFS_POST_API;
export const IPFS_GET_API = process.env.REACT_APP_IPFS_GET_API;
export const GRAPHQL_API = process.env.REACT_APP_GRAPHQL_API || '';
export const DATETIME_FORMAT = {
  LONG_FORMAT: 'do MMM yyyy HH:mm:ss',
  MEDIUM_FORMAT: 'do MMM yyyy HH:mm',
  SHORT_FORMAT: 'do MMM yyyy',
  INPUT_FORMAT: 'dd/MM/yyyy',
};
export const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
