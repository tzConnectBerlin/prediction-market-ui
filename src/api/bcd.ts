import axios from 'axios';
import { SimilarContractResponse } from '../interfaces/bcd';
import { BCD_BASE_API, MARKET_ADDRESS, NETWORK } from '../utils/globals';

export const getSimilarContracts = async (
  contractAddress = MARKET_ADDRESS,
  network = NETWORK,
): Promise<SimilarContractResponse> => {
  return (await axios.get(`${BCD_BASE_API}/contract/${network}/${contractAddress}/similar`)).data;
};

export const getSameContracts = async (
  contractAddress = MARKET_ADDRESS,
  network = NETWORK,
): Promise<SimilarContractResponse> => {
  return (await axios.get(`${BCD_BASE_API}/contract/${network}/${contractAddress}/same`)).data;
};
