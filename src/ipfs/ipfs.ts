import ipfsClient from 'ipfs-http-client';

const FETCH_IPFS_PROVIDER = 'https://ipfs.io/ipfs/';
const IPFS_PROVIDER = 'http://127.0.0.1:5001';

export const fetchIPFSData = async <T>(cid: string, provider = FETCH_IPFS_PROVIDER): Promise<T> => {
  const data = await fetch(`${provider}${cid}`);
  const result = await data.json();
  return result;
};

export const addIPFSData = async <T>(data: T, provider = IPFS_PROVIDER): Promise<string> => {
  const ipfs = ipfsClient({ url: provider });
  const response = await ipfs.add(JSON.stringify(data) as any);
  return response.path;
};
