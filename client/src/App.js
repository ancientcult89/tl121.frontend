import Auth from "./pages/Auth";
import React, {useContext, useEffect, useState} from "react";
import { BrowserRouter } from "react-router-dom";
import { Spin } from 'antd';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)
      useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [user])

    if (loading) {
        return <Spin/>
    }
  return (
        <React.StrictMode>
            <BrowserRouter>
                <Auth />
            </BrowserRouter>
        </React.StrictMode>
  );
});

export default App;
