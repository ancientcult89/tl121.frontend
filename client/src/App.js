import React, {useContext, useEffect, useState} from "react";
import { BrowserRouter } from "react-router-dom";
import { Spin } from 'antd';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import LayoutBar from "./components/LayoutBar";
import TopBar from "./components/TopBar";
import {enLocale} from "./locales/en-En";
import './global.css';

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const {locale} = useContext(Context)
    const [selectedLocale, setSelectedLocale] = useState(enLocale);
    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token != null ?? token !== '')
        {
            user.setUser(true);
            user.setIsAuth(true)
        }
        setSelectedLocale(enLocale);
        locale.setLocale("En");
        setLoading(false)
    }, [user])

    if (loading) {
        return <Spin/>
    }
    return (
        <React.StrictMode>
            <BrowserRouter>
                <TopBar/>
                <LayoutBar/>
            </BrowserRouter>
        </React.StrictMode>
    );
});

export default App;
