import ipfsClient from 'ipfs-http-client';
import all from 'it-all';

let ipfs: any = null;

const checkIPFS = (): void => {
  if (!ipfs) {
    throw new Error('IPFS client not initialized');
  }
};

export const fetchIPFSData = async <T>(cid: string): Promise<T> => {
  checkIPFS();
  const data = (await all(ipfs.cat(cid, { encoding: 'json' })))[0];
  const newData = String.fromCharCode.apply(null, data as any);
  return JSON.parse(newData);
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
  ipfs = ipfsClient({ url: `${url}:${port}` });
};
