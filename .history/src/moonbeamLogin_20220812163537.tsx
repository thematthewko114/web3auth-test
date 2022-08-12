import { useEffect, useState } from "react";
import { Web3AuthCore } from "@web3auth/core";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider, WALLET_ADAPTERS } from "@web3auth/base";
import RPC from "./web3RPC";
import "./App.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

const clientId = "BE-ZOyYe33e6M8fRpuZZPxIT7B33LFBfqU5jFsmxGr3CuEX6R7_Ue88FMivlK7_n35P2EeXZPMzcRVyUgVBhyoA"; // get from https://dashboard.web3auth.io


interface userInterface {
  userInfo: any,
  chain: string,
  account: string,
  balance: string
}

function MoonbeamLogin() {
  const [web3auth, setWeb3auth] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [user, setUser] = useState<userInterface>({
    userInfo: {},
    chain: "0",
    account: "0",
    balance: "0"
  })
  const navigate = useNavigate()

  useEffect(() => {
    // const init = async () => {
    //   try {
    //     const web3authObj = new Web3AuthCore({
    //       chainConfig: {
    //         chainNamespace: CHAIN_NAMESPACES.EIP155,
    //         chainId: "0x504",
    //         rpcTarget: "https://rpc.ankr.com/moonbeam"
    //       },
    //       // uiConfig: {
    //       //   appLogo: "https://i.ibb.co/FHWfKs5/tridecoin-green.png"
    //       // }
    //     });

    //   setWeb3auth(web3authObj);

    //   await web3authObj.initModal({
    //     modalConfig: {
    //       [WALLET_ADAPTERS.OPENLOGIN]: {
    //         label: "openlogin",
    //         loginMethods: {
    //           reddit: {
    //             showOnModal: false,
    //             name: "reddit",
    //           },
    //           facebook: {
    //             showOnModal: false,
    //             name: "facebook",
    //           },
    //           google: {
    //             showOnModal: false,
    //             name: "google",
    //           },
    //           discord: {
    //             showOnModal: false,
    //             name: "discord",
    //           },
    //           twitch: {
    //             showOnModal: false,
    //             name: "twitch",
    //           },
    //           twitter: {
    //             showOnModal: false,
    //             name: "twitter",
    //           },
    //           line: {
    //             showOnModal: false,
    //             name: "line",
    //           },
    //           github: {
    //             showOnModal: false,
    //             name: "github",
    //           },
    //           kakao: {
    //             showOnModal: false,
    //             name: "kakao",
    //           },
    //           linkedin: {
    //             showOnModal: false,
    //             name: "linkedin",
    //           },
    //           weibo: {
    //             showOnModal: false,
    //             name: "weibo",
    //           },
    //           wechat: {
    //             showOnModal: false,
    //             name: "wechat",
    //           },
    //           email_passwordless: {
    //             showOnModal: false,
    //             name: "email_passwordless",
    //           },
    //           apple: {
    //             showOnModal: false,
    //             name: "apple",
    //           }
    //         },
    //       },
    //     },
    //   });
    //     if (web3authObj.provider) {
    //       setProvider(web3authObj.provider);
    //     };
    //     setTimeout(() => {
    //       navigate("/user")
    //     }, 3000)
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // init();
    //**********initialize web3auth
    const init = async () => {
      const Web3AuthCoreOptions = {
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x504",
          rpcTarget: "https://rpc.ankr.com/moonbeam",
          ticker: "GLMR",
          tickerName: "Glimmer",
          blockExplorer: "https://moonbeam.moonscan.io/",
          displayName: "Moonbeam"
        },
      }
      const web3authObj = new Web3AuthCore(Web3AuthCoreOptions);
      setWeb3auth(web3authObj);
      await web3authObj.init();
    }
    init()
    
    // const openloginAdapter = new OpenloginAdapter({
    //   adapterSettings: {
    //     clientId, // Web3Auth Client ID
    //     network: "testnet",
    //     uxMode: "popup",
    //     loginConfig: {
    //       jwt: {
    //         name: "Name of your choice",
    //         verifier: "YOUR-VERIFIER-NAME-ON-WEB3AUTH-DASHBOARD",
    //         typeOfLogin: "jwt",
    //         clientId: "YOUR-CLIENTID-FROM-LOGIN-PROVIDER",
    //       },
    //     },
    //     whiteLabel: {
    //       name: "Tride ID",
    //       logoLight: "https://i.ibb.co/FHWfKs5/tridecoin-green.png",
    //       logoDark: "https://i.ibb.co/FHWfKs5/tridecoin-green.png",
    //       defaultLanguage: "en",
    //     },
    //   },
    // });
    
    // web3auth.configureAdapter(openloginAdapter);
  }, []);

  useEffect(() => {
    console.log("diu", provider)
  }, [provider])
  useEffect(() => {
    console.log("diu", web3auth)
  }, [web3auth])

  const login = async () => {
    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: {
        clientId, // Web3Auth Client ID
        network: "testnet",
        uxMode: "popup",
        loginConfig: {
          jwt: {
            name: "Name of your choice",
            verifier: "YOUR-VERIFIER-NAME-ON-WEB3AUTH-DASHBOARD",
            typeOfLogin: "jwt",
            clientId: "YOUR-CLIENTID-FROM-LOGIN-PROVIDER",
          },
        },
      },
    });
    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: "jwt",
      extraLoginOptions: {
        domain: "YOUR-LOGIN-PROVIDER-DOMAIN",
        verifierIdField: "sub",
        response_type: "token",
        scope: "email profile openid",
      },
    });
    if(web3auth){
      web3auth.configureAdapter(openloginAdapter);
    }
    else {
      console.log("web3auth not initialized yet");
      return;
    }
    setProvider(web3authProvider);
  };

 
  const loggedInView = (
    <>
      <div>Logging you in...</div>
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

      <div className="grid">{provider ? loggedInView : unloggedInView}</div>
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

export default MoonbeamLogin;