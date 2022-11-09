import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Web3ContextProvider } from "./hooks/web3Context";
import { LockInfoProvider } from "./hooks/useLockInfo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Web3ContextProvider>
      <LockInfoProvider>
        <App />
      </LockInfoProvider>
    </Web3ContextProvider>
  </React.StrictMode>
);
