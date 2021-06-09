import axios from 'axios';
import { create } from 'ipfs-http-client';
import { IPFS_API, IPFS_PORT } from '../utils/globals';

let ipfs: any = null;

const checkIPFS = (): void => {
  if (!ipfs) {
    throw new Error('IPFS client not initialized');
  }
};

export const fetchIPFSData = async <T>(cid: string): Promise<T> => {
  const response = await axios.post(`${IPFS_API}:${IPFS_PORT}/api/v0/cat?encoding=json&arg=${cid}`);
  return response.data;
};

export const addIPFSData = async <T>(data: T): Promise<string> => {
  checkIPFS();
  const response = await ipfs.add(JSON.stringify(data));
  await ipfs.pin.add(response.path);
  return response.path;
};

export const initIPFSClient = (url = '', port: string | number = 80): void => {
  if (!url) {
    throw Error('REACT_APP_IPFS_API not set');
  }
  ipfs = create({ url: `${url}:${port}` });
};
