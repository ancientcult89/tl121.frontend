import React, {useContext, useEffect, useState} from "react";
import { BrowserRouter } from "react-router-dom";
import { Spin } from 'antd';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import LayoutBar from "./components/LayoutBar";
import TopBar from "./components/TopBar";
import './global.css';
import {localeList} from "./locales/localeList";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const {locale} = useContext(Context)
    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token != null ?? token !== '')
        {
            user.setUser(true);
            user.setIsAuth(true)
        }
        const storageLocale = localStorage.getItem('locale');

        if(storageLocale == null || storageLocale === '')
        {
            locale.setLocale(localeList[1]);
            locale.setLocale(localeList[1].localeName);
            localStorage.setItem('locale', localeList[1].localeName);
        }
        else
        {
            locale.setLocale(storageLocale);
        }
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
