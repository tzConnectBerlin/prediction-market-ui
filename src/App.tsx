import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from './design-system/atoms/Button/Button';
import { getIpfsInstance } from './ipfs/ipfs';
import { IPFSProvider } from './ipfs/IpfsContext';

const App: React.FC = () => {
  const [ipfs, setIpfs] = useState<any>(undefined);
  useEffect(() => {
    const initIpfs = async () => {
      const ipfsInstance = await getIpfsInstance();
      setIpfs(ipfsInstance);
    };
    if (!ipfs) {
      initIpfs();
    }
  }, []);

  return (
    <IPFSProvider value={{ ipfs }}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Button label="Click Click" primary />
        </header>
      </div>
    </IPFSProvider>
  );
};

export default App;
