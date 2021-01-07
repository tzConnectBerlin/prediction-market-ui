import axios from 'axios';
import { BigMapKeysResponseItem, NodeSchema, SimilarContractResponse } from '../interfaces/bcd';
import { BCD_BASE_API, MARKET_ADDRESS, NETWORK } from '../utils/globals';

const get = async <T>(endpoint: string): Promise<T> => {
  return (await axios.get(`${BCD_BASE_API}/${endpoint}`)).data;
};

export const getSimilarContracts = async (
  contractAddress = MARKET_ADDRESS,
  network = NETWORK,
): Promise<SimilarContractResponse> => {
  return get(`/contract/${network}/${contractAddress}/similar`);
};

export const getSameContracts = async (
  contractAddress = MARKET_ADDRESS,
  network = NETWORK,
): Promise<SimilarContractResponse> => {
  return get(`/contract/${network}/${contractAddress}/same`);
};

export const getContractStorage = async (
  contractAddress = MARKET_ADDRESS,
  network = NETWORK,
): Promise<NodeSchema> => {
  return get(`/contract/${network}/${contractAddress}/storage`);
};

export const getBigMapKeys = async (
  ptr: number,
  network = NETWORK,
): Promise<BigMapKeysResponseItem[]> => {
  return get(`/bigmap/${network}/${ptr}/keys`);
};
