import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Web3AuthCore} from "@web3auth/core";
import { CHAIN_NAMESPACES, CustomChainConfig } from '@web3auth/base';

interface Web3AuthCoreOptions {
  chainConfig: Partial<CustomChainConfig> & Pick<CustomChainConfig, "chainNamespace">;
  enableLogging?: boolean;
  storageKey?: "session" | "local";
}

function App() {
  const [web3auth, setweb3auth] = React.useState(new Web3AuthCore({
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x1",
      rpcTarget: "https://rpc.ankr.com/eth", // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
    }
  }))
  React.useEffect(() => {
    initAuth()
    console.log("initiated auth")
  }, [])
  async function initAuth() {
    await web3auth.init();
  }
  console.log(web3auth)
  return (
    <div className="App">
      <header className="App-header">
        <div>hahaha</div>
      </header>
    </div>
  );
}

export default App;
