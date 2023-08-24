import React, {useContext, useEffect, useState} from 'react';
import {Button, Row} from "antd";
import {Context} from "../index";
import {enLocale} from "../locales/en-En";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const TopBar = () => {
    const {locale, user} = useContext(Context)
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.setItem('token', '');
        user.setIsAuth(false);
        user.setUser(null);
        navigate(LOGIN_ROUTE);
    }
    return (
        <div style={{background:"black", height: 42}}>
            <Row >
                <div style={{color:"white", fontSize: "20px", marginLeft: 5, marginTop: 5}}
                >
                    TeamLead Helper
                </div>
                <Button style={{marginTop: 5, marginLeft: 5}}>{locale.locale.SignIn}</Button>
                <Button style={{marginTop: 5, marginLeft: 5}}>{locale.locale.Register}</Button>
                <Button style={{marginTop: 5, marginLeft: 5}} onClick={logOut}>{locale.locale.LogOut}</Button>
            </Row>
        </div>
    );
};

export default TopBar;