import axios from 'axios';
import localForage from 'localforage';
import { logError } from '../logger/logger';
import { IPFS_GET_API, IPFS_POST_API } from '../utils/globals';

const axiosIPFSPost = axios.create({
  baseURL: IPFS_POST_API,
});

const axiosIPFSGet = axios.create({
  baseURL: IPFS_GET_API,
});

export const fetchIPFSData = async <T>(cid: string): Promise<T> => {
  try {
    const data = await localForage.getItem<T>(cid);
    if (data) {
      return data;
    }
  } catch (error) {
    logError(error);
  }
  const response = await axiosIPFSGet.get<T>(`${cid}`);

  await localForage.setItem(cid, response.data);
  return response.data;
};

export const addIPFSData = async <T>(data: T): Promise<string> => {
  const res = await axiosIPFSPost.post(`/add-json`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data.IpfsHash;
};
