import React, {useContext, useEffect, useState} from 'react';
import {Button, Row} from "antd";
import {Context} from "../index";
import {enLocale} from "../locales/en-En";

const TopBar = () => {
    const {locale} = useContext(Context)
    const [selectedLocale, setSelectedLocale] = useState(null);
    useEffect(() => {
        setSelectedLocale(enLocale);
        locale.setLocale("En");
    });

    return (
        <div style={{background:"black", height: 42}}>
            <Row >
                <div style={{color:"white", fontSize: "20px", marginLeft: 5, marginTop: 5}}
                >
                    TeamLead Helper
                </div>
                <Button style={{marginTop: 5, marginLeft: 5}}>{locale.locale.SignIn}</Button>
                <Button style={{marginTop: 5, marginLeft: 5}}>{locale.locale.Register}</Button>
                <Button style={{marginTop: 5, marginLeft: 5}}>{locale.locale.LogOut}</Button>
            </Row>
        </div>
    );
};

export default TopBar;