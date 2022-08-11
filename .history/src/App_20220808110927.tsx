import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Web3AuthCore} from "@web3auth/core";
import {Web3Auth} from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, CustomChainConfig } from '@web3auth/base';
import {OpenloginAdapter} from "@web3auth/openlogin-adapter";

function App() {
  const [web3auth, setweb3auth] = React.useState(new Web3Auth({
    clientId: "BKL1vPl31pZe7VwghTwAdX8tccMadwFtjHMyzXw1KPS9TO0uG5ezxbhROwpw0KxFsEXE80qZLR7yuzU1VEXtYVs",
    chainConfig: {
      chainNamespace: "eip155",
    chainId: "0x1",
    }
  }))

  // const openloginAdapter = new OpenloginAdapter({
  //   adapterSettings: {
  //     clientId, // Web3Auth Client ID
  //     network: "testnet",
  //     uxMode: "popup",
  //     whiteLabel: {
  //       name: "Your app Name",
  //       logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
  //       logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
  //       defaultLanguage: "en",
  //       dark: true, // whether to enable dark mode. defaultValue: false
  //     },
  //   },
  // });
  React.useEffect(() => {
    web3auth.initModal();
    console.log("initiated auth")
  }, [])
  async function connectAuth() {
    await web3auth.connect();
  }
  console.log(web3auth)
  return (
    <div className="App">
      <header className="App-header">
        <div>hahaha</div>
        <button onClick={()=>connectAuth()}>Connect</button>
      </header>
    </div>
  );
}

export default App;
