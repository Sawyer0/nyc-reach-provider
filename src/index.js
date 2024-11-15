import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProviderProvider } from "./context/ProviderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProviderProvider>
      <App />
    </ProviderProvider>
  </React.StrictMode>
);
