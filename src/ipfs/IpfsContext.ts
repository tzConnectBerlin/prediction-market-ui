import { createContext } from 'react';

interface IpfsContext {
  ipfs: any | null;
}

const IPFSContext = createContext<IpfsContext>({ ipfs: null });

export const IPFSProvider = IPFSContext.Provider;
export default IPFSContext;
