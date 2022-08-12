import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider, WALLET_ADAPTERS } from "@web3auth/base";
import RPC from "./web3RPC";
import "./App.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const clientId = "BE-ZOyYe33e6M8fRpuZZPxIT7B33LFBfqU5jFsmxGr3CuEX6R7_Ue88FMivlK7_n35P2EeXZPMzcRVyUgVBhyoA"; // get from https://dashboard.web3auth.io


interface userInterface {
  userInfo: any,
  chain: string,
  account: string,
  balance: string
}

function UserPage() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [user, setUser] = useState<userInterface>({
    userInfo: {},
    chain: "0",
    account: "0",
    balance: "0"
  })
  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x504",
            rpcTarget: "https://rpc.ankr.com/moonbeam"
          },
          uiConfig: {
            appLogo: "https://i.ibb.co/tpz8qpJ/tridecoin-green-light.png"
          }
        });

      setWeb3auth(web3auth);

      await web3auth.initModal({
        modalConfig: {
          [WALLET_ADAPTERS.OPENLOGIN]: {
            label: "openlogin",
            loginMethods: {
              reddit: {
                showOnModal: false,
                name: "reddit",
              },
              facebook: {
                showOnModal: false,
                name: "facebook",
              },
              google: {
                showOnModal: false,
                name: "google",
              },
              discord: {
                showOnModal: false,
                name: "discord",
              },
              twitch: {
                showOnModal: false,
                name: "twitch",
              },
              twitter: {
                showOnModal: false,
                name: "twitter",
              },
              line: {
                showOnModal: false,
                name: "line",
              },
              github: {
                showOnModal: false,
                name: "github",
              },
              kakao: {
                showOnModal: false,
                name: "kakao",
              },
              linkedin: {
                showOnModal: false,
                name: "linkedin",
              },
              weibo: {
                showOnModal: false,
                name: "weibo",
              },
              wechat: {
                showOnModal: false,
                name: "wechat",
              },
              email_passwordless: {
                showOnModal: false,
                name: "email_passwordless",
              },
              apple: {
                showOnModal: false,
                name: "apple",
              }
            },
          },
        },
      });
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        };
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if(web3auth){
      navigate("/user")
    }
  }, [web3auth])

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
    console.log(user)
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    const address = await rpc.getAccounts();
    const balance = await rpc.getBalance();
    setUser({
      ...user,
      userInfo: user,
      chain: chainId,
      account: address,
      balance: balance
    })
  };

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
    <>
    <Button variant="contained"><Link to="/">Home</Link></Button>
    <Button onClick={()=>login()} style={{margin: "20px"}} variant="contained">
      Login
    </Button>
    </>
  );

  return (
    <>
    <div className="container">
      <h1 className="title">
        Tride login dummy
      </h1>
      <div className="grid">{loggedInView}</div>
    </div>
    <footer className="footer">
      <div style={{width: "100%"}}>User info: </div>
      <div style={{width: "100%"}}>Chain ID: {user.chain}</div>
      <div style={{width: "100%"}}>Account: {user.account} </div>
      <div style={{width: "100%"}}>
        Balance: {user.balance} GLMR
      </div>
    </footer>
    </>
  );
}

export default UserPage;