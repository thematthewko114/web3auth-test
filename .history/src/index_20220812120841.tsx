import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ETHLogin from './ethLogin';
import MoonbeamLogin from './moonbeamLogin';
import MoonriverLogin from './moonriverLogin';
import UserPage from './user';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login/ethereum" element={<ETHLogin />} />
      <Route path="/login/moonbeam" element={<MoonbeamLogin/>} />
      <Route path="/login/moonriver" element={<MoonriverLogin />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
