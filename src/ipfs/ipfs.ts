import ipfsClient from 'ipfs-http-client';

const DEFAULT_IPFS_URL = `http://127.0.0.1`;

export const fetchIPFSData = async <T>(
  cid: string,
  url = DEFAULT_IPFS_URL,
  port = 8080,
): Promise<T> => {
  const data = await fetch(`${url}:${port}/ipfs/${cid}`);
  const result = await data.json();
  return result;
};

export const addIPFSData = async <T>(
  data: T,
  url = DEFAULT_IPFS_URL,
  port = 5001,
): Promise<string> => {
  const ipfs = ipfsClient({ url: `${url}:${port}` });
  const response = await ipfs.add(JSON.stringify(data) as any);
  return response.path;
};
