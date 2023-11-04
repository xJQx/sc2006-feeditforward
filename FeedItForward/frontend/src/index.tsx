import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProviders } from "./contexts/ContextProviders";
import Modal from "react-modal";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ContextProviders>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContextProviders>
);

Modal.setAppElement("#root");
