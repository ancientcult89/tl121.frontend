import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import GradeStore from "./store/GradeStore";
import PersonStore from "./store/PersonStore";
import LocaleStore from "./store/LocaleStore";
import ProjectStore from "./store/ProjectStore";
import MeetingStore from "./store/MeetingStore";
import RoleStore from "./store/RoleStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Context.Provider
            value={{
                user: new UserStore(),
                grade: new GradeStore(),
                person: new PersonStore(),
                locale: new LocaleStore(),
                project: new ProjectStore(),
                meeting: new MeetingStore(),
                role: new RoleStore(),
            }}
        >
            <App />
        </Context.Provider>
    </React.StrictMode>
);