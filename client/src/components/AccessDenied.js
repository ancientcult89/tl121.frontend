import React, {useContext} from 'react';
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";

const AccessDenied = () => {
    const navigate = useNavigate();
    const {locale} = useContext(Context);
    return (
        <Result
            status="error"
            title={locale.locale.AccessDeniedTitle}
            subTitle={locale.locale.AccessDeniedMessage}
            extra={[
                <Button type="primary"  onClick={(e)=> {
                    window.location.href = '/login'
                }}>
                    {locale.locale.SignIn}
                </Button>,
                <Button onClick={() => navigate(-1)}>{locale.locale.Back}</Button>,
            ]}
        />
    );
};

export default AccessDenied;