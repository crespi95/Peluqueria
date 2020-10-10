 import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Logout from "./App/components/pulsador";
import App from './App/App';
import {BrowserRouter} from "react-router-dom";




ReactDOM.render(
  
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

ReactDOM.render(
  <BrowserRouter>
    <Logout />
  </BrowserRouter>,
  document.getElementById("logout")
);