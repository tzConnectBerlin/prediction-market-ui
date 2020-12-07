import { useContext } from 'react';
import IPFSContext from './IpfsContext';

export const useIpfs = () => {
  const { ipfs } = useContext(IPFSContext);
  return ipfs;
};
