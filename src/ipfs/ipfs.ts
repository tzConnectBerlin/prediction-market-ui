import IPFS from 'ipfs-core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getIpfsInstance = async () => {
  const ipfs = await IPFS.create();
  return ipfs;
};
