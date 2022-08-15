import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "./web3RPC";
import "./App.css";

const clientId = "BKL1vPl31pZe7VwghTwAdX8tccMadwFtjHMyzXw1KPS9TO0uG5ezxbhROwpw0KxFsEXE80qZLR7yuzU1VEXtYVs"; // get from https://dashboard.web3auth.io

interface User {
  address: String,
  balance: String
}

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [user, setUser] = useState<User>({
    address: "",
    balance: ""
  })

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x505",
          },
          uiConfig: {
            theme: 'light',
            loginMethodsOrder: ["google", "facebook", "twitter", "reddit", "discord", "twitch", "github", "linkedin", "email_passwordless"],
            appLogo: "https://i.ibb.co/mTh6D4S/tridecoin-green-light.png"
          }
        });
        setWeb3auth(web3auth);
        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        };
      } 
      catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(()=> {
    getAccounts();
  }, [provider])

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    const balance = await rpc.getBalance();
    setUser({
      ...user,
      address: address,
      balance: balance
    });
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };
  const loggedInView = (
    <>
    <div>
      <button onClick={getUserInfo} className="card" style={{marginRight: "6px"}}>
        Get User Info
      </button>
      <button onClick={getChainId} className="card" style={{marginRight: "6px"}}>
        Get Chain ID
      </button>
      <button onClick={getAccounts} className="card" style={{marginRight: "6px"}}>
        Get Accounts
      </button>
      <button onClick={sendTransaction} className="card" style={{marginRight: "6px"}}>
        Send Transaction
      </button>
      <button onClick={signMessage} className="card" style={{marginRight: "6px"}}>
        Sign Message
      </button>
      <button onClick={getPrivateKey} className="card" style={{marginRight: "6px"}}>
        Get Private Key
      </button>
      <button onClick={logout} className="card">
        Log Out
      </button>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </div>
    <div>You are logged in</div>
    <div>Address: {user.address}</div>
    <div>Balance: {user.balance} ETH</div>
    </>
  );

  const unloggedInView = (
    <>
    <div style={{marginBottom: "8px"}}>
      <button onClick={login} className="card">
        Login
      </button>
    </div>
    <div>You are not logged in</div>
    </>
  );

  return (
    <div className="container">
      <h1 className="title">
        Web3Auth & ReactJS Example
      </h1>

      <div className="grid">{provider ? loggedInView : unloggedInView}</div>
    </div>
  );
}

export default App;