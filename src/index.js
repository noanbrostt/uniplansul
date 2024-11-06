import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store"; // Certifique-se de que a configuração do Redux está correta
import App from "./App";
import "./index.css"; // Verifique se este arquivo contém o CSS global

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
