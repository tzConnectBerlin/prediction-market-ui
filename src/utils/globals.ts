import { NetworkType } from '../interfaces';

export const APP_NAME = process.env.REACT_APP_APP_NAME || 'Prediction Market';
export const NETWORK = (process.env.REACT_APP_NETWORK_TYPE || 'delphinet') as NetworkType;
export const MARKET_ADDRESS = process.env.REACT_APP_MARKET_CONTRACT;
export const RPC_URL = process.env.REACT_APP_RPC_URL;
export const RPC_PORT = process.env.REACT_APP_RPC_PORT;
export const IPFS_PORT = process.env.REACT_APP_IPFS_PORT;
export const IPFS_API = process.env.REACT_APP_IPFS_API;
export const BCD_BASE_API = process.env.REACT_APP_BASE_BCD_API || 'https://api.better-call.dev/v1/';
export const ENABLE_SAME_MARKETS = process.env.REACT_APP_ENABLE_SAME_MARKETS === 'true';
export const ENABLE_SIMILAR_MARKETS = process.env.REACT_APP_ENABLE_SIMILAR_MARKETS === 'true';
export const LONG_DATE_FORMAT = 'do MMM yyyy HH:mm';
export const TEZOS_MDW_API =
  process.env.REACT_APP_TEZOS_MDW || 'https://pmcache.newby.org/markets.json';
