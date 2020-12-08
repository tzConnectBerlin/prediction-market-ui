import { createContext } from 'react';
import { WalletInterface } from '../interfaces/wallet';

const WalletContext = createContext<Partial<WalletInterface>>({});

export const WalletProvider = WalletContext.Provider;
export default WalletContext;
