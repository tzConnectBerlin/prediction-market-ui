import { useContext } from 'react';
import IPFSContext from './IpfsContext';

export const useIpfs = (): any => {
  const { ipfs } = useContext(IPFSContext);
  return ipfs;
};
