import React, { useContext } from 'react';
import { Button, Col, Row } from "antd";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, USER_PROFILE_ROUTE, VERSION } from "../utils/consts";
import { observer } from "mobx-react-lite";
import LocaleSelector from "./LocaleSelector";

const TopBar = observer(() => {
    const { locale, user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.setItem('token', '');
        user.setIsAuth(false);
        user.setUser(null);
        user.setRole('');
        localStorage.setItem('role', '');
        navigate(LOGIN_ROUTE);
    };

    const goProfile = () => {
        navigate(USER_PROFILE_ROUTE);
    };

    const marginTopButtons = 8;
    const signIn = () => {
        navigate(LOGIN_ROUTE);
    };

    return (
        <div style={{ background: "rgb(0, 33, 64)", height: 47, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
            <div style={{ color: "white", fontSize: "25px" }}>
                TeamLead Helper ({VERSION})
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <LocaleSelector />
                {user.isAuth && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button style={{ marginLeft: 5 }} onClick={goProfile}>{locale.locale.Profile}</Button>
                        <Button style={{ marginLeft: 5 }} type={"primary"} onClick={logOut}>{locale.locale.LogOut}</Button>
                    </div>
                )}
            </div>
        </div>
    );
});

export default TopBar;