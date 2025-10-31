import React from "react";
import ReactDOM from "react-dom/client";
import { App } from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css"; // 👈 importante
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/index.ts";
import "./App.css";
import "./index.css";
import "./shared/styles/colors.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
