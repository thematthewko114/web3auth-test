import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "./web3RPC";
import "./App.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function App() {
  

  return (
    <>
      <div className="container">
        <h1 className="title">
          Tride login dummy
        </h1>
        <Button><Link to="/login/ethereum">Ethereum</Link></Button>
        <Button><Link to="/login/moonbeam">Moonbeam</Link></Button>
        <Button><Link to="/login/moonriver">Moonriver</Link></Button>
      </div>
    </>
  );
}

export default App;