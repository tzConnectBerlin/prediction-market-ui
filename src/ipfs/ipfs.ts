import axios from 'axios';
import localForage from 'localforage';
import { logError } from '../logger/logger';
import { IPFS_API, IPFS_PORT } from '../utils/globals';

export const fetchIPFSData = async <T>(cid: string): Promise<T> => {
  try {
    const data = await localForage.getItem<T>(cid);
    if (data) {
      return data;
    }
  } catch (error) {
    logError(error);
  }
  const response = await axios.post<T>(
    `${IPFS_API}:${IPFS_PORT}/api/v0/cat?encoding=json&arg=${cid}`,
  );
  await localForage.setItem(cid, response.data);
  return response.data;
};

export const addIPFSData = async <T>(data: T): Promise<string> => {
  const str = JSON.stringify(data, null, 0);
  const uint8Array = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i += 1) {
    uint8Array[i] = str.charCodeAt(i);
  }
  const blob = new Blob([uint8Array]);
  const formData = new FormData();
  formData.set('file', blob);
  const res = await axios.post(
    `${IPFS_API}:${IPFS_PORT}/api/v0/add?stream-channels=true&progress=false&pin=true`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data.Hash;
};
