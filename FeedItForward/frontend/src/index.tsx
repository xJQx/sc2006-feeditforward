import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProviders } from "./contexts/ContextProviders";
import Modal from "react-modal";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ContextProviders>
    <GoogleOAuthProvider clientId="370965426638-i0rrab5nup1oh8ocphpmgkvqv857o7vq.apps.googleusercontent.com">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider>
  </ContextProviders>
);

Modal.setAppElement("#root");
