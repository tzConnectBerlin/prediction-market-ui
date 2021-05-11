import { NetworkType } from '../interfaces';

export const APP_NAME = process.env.REACT_APP_APP_NAME || 'Prediction Market';
export const NETWORK = (process.env.REACT_APP_NETWORK_TYPE || 'edonet') as NetworkType;
export const MARKET_ADDRESS = process.env.REACT_APP_MARKET_CONTRACT;
export const FA12_CONTRACT = process.env.REACT_APP_FA12_CONTRACT;
export const RPC_URL = process.env.REACT_APP_RPC_URL || 'https://edonet.smartpy.com';
export const RPC_PORT = process.env.REACT_APP_RPC_PORT || 443;
export const IPFS_PORT = process.env.REACT_APP_IPFS_PORT;
export const IPFS_API = process.env.REACT_APP_IPFS_API;
export const BCD_BASE_API = process.env.REACT_APP_BASE_BCD_API || 'https://api.better-call.dev/v1/';
export const ENABLE_SAME_MARKETS = process.env.REACT_APP_ENABLE_SAME_MARKETS === 'true';
export const ENABLE_SIMILAR_MARKETS = process.env.REACT_APP_ENABLE_SIMILAR_MARKETS === 'true';
export const TEZOS_MDW_API =
  process.env.REACT_APP_TEZOS_MDW || 'https://pmcache.newby.org/markets.json';
export const DATETIME_FORMAT = {
  LONG_FORMAT: 'do MMM yyyy HH:mm:ss',
  MEDIUM_FORMAT: 'do MMM yyyy HH:mm',
  SHORT_FORMAT: 'do MMM yyyy',
  INPUT_FORMAT: 'dd/MM/yyyy',
};
export const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
