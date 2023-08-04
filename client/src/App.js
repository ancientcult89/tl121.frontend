import Auth from "./pages/Auth";
import React, {useContext, useEffect, useState} from "react";
import { BrowserRouter } from "react-router-dom";
import { Spin } from 'antd';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import LayoutBar from "./components/LayoutBar";
import TopBar from "./components/TopBar";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // check().then(data => {
        //     user.setUser(true)
        //     user.setIsAuth(true)
        // }).finally(() => setLoading(false))
        let token = localStorage.getItem('token');
        console.log('token: ' +  token);
        if(token !== null && token !== '')
        {
            user.setUser(true);
            user.setIsAuth(true)
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
                <LayoutBar>
                </LayoutBar>
            </BrowserRouter>
        </React.StrictMode>
    );
});

export default App;
