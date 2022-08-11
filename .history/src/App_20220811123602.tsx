import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "./web3RPC";
import "./App.css";

const clientId = "BE-ZOyYe33e6M8fRpuZZPxIT7B33LFBfqU5jFsmxGr3CuEX6R7_Ue88FMivlK7_n35P2EeXZPMzcRVyUgVBhyoA"; // get from https://dashboard.web3auth.io


interface userInterface {
  chain: string,
  account: string,
  balance: string
}

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [user, setUser] = useState<userInterface>({
    chain: "chain",
    account: "account",
    balance: "balance"
  })

  useEffect(() => {
    const init = async () => {
      try {

      const web3auth = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x1",
          rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
        },
      });

      setWeb3auth(web3auth);

      await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        };
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  

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
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    const address = await rpc.getAccounts();
    const balance = await rpc.getBalance();
    setUser({
      ...user,
      chain: chainId,
      account: address[0],
      balance: balance
    })
  };
if(web3auth && provider){
      getUserInfo()
    }
  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
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
      <button onClick={getUserInfo} className="card">
        Get User Info
      </button>
      <button onClick={sendTransaction} className="card">
        Send Transaction
      </button>
      <button onClick={signMessage} className="card">
        Sign Message
      </button>
      <button onClick={getPrivateKey} className="card">
        Get Private Key
      </button>
      <button onClick={logout} className="card">
        Log Out
      </button>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login with wallet
    </button>
  );

  return (
    <>
    <div className="container">
      <h1 className="title">
        Tride login dummy
      </h1>

      <div className="grid">{provider ? loggedInView : unloggedInView}</div>
    </div>
    <footer className="footer">
      <div style={{width: "100%"}}>User info: </div>
      <div style={{width: "100%"}}>Chain ID: {user.chain}</div>
      <div style={{width: "100%"}}>Account: {user.account} </div>
      <div style={{width: "100%"}}>Balance: {user.balance} ETH </div>
    </footer>
    </>
  );
}

export default App;