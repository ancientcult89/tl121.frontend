import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import GradeStore from "./store/GradeStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Context.Provider
            value={{ user: new UserStore(), grades: new GradeStore() }}
        >
            <App />
        </Context.Provider>
    </React.StrictMode>
);