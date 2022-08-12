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
        <Button variant="contained"><Link to="/login/moonbeam">Login with Moonbeam</Link></Button>
      </div>
    </>
  );
}

export default App;