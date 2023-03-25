import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { GlobalProvider } from "./context/GlobalContext";
import "./index.css";
import Router from "./router/Router";

axios.defaults.baseURL = "http://dev3.dansmultipro.co.id/api/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <GlobalProvider>
    <Router />
  </GlobalProvider>
  // </React.StrictMode>
);
