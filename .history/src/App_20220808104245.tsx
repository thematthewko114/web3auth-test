import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Web3AuthCore } from "@web3auth/core";
import { CHAIN_NAMESPACES } from '@web3auth/base';

function App() {

  const web3auth = new Web3AuthCore({
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x1",
      rpcTarget: "https://rpc.ankr.com/eth",
    }
  });
  return (
    <div className="App">
      <header className="App-header">
        <div>hahaha</div>
      </header>
    </div>
  );
}

export default App;
