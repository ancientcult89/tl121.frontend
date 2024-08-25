import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Card, Space, Spin} from "antd";
import {Context} from "../index";
import {getCurrentUser} from "../http/userApi";
import {unauthRedirect} from "../utils/unauthRedirect";
import UserCommonSettings from "../components/UserSettings/UserCommonSettings/UserCommonSettings";
import UserMailSettings from "../components/UserSettings/UserMailSettings/UserMailSettings";
import UserPasswordSettings from "../components/UserSettings/UserPasswordSettings/UserPasswordSettings";

const UserSettings = () => {
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {locale} = useContext(Context);

    useEffect(() => {
        if(userId === null) {
            getCurrentUser()
                .then(userId => {
                    setUserId(userId);
                    setIsLoading(false);
                })
                .catch(e => unauthRedirect(e));
        }
        else {
            setIsLoading(false);
        }
    }, [userId]);

    return (
        <Spin tip={locale.locale.Loading} spinning={isLoading}>
            <Space direction="vertical" size={16} style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center' // Выровнять элементы по центру
            }}>
                <Card title={locale.locale.Profile.CommonSettings} type="inner" style={{ width: 500 }}>
                    <UserCommonSettings
                        userId={userId}
                    />
                </Card>
                <Card title={locale.locale.Profile.MailSettings} type="inner" style={{ width: 500 }}>
                    <UserMailSettings
                        userId={userId}
                    />
                </Card>
                <Card title={locale.locale.Profile.Password} type="inner" style={{ width: 500 }}>
                    <UserPasswordSettings
                        userId={userId}
                    />
                </Card>
            </Space>
        </Spin>
    )
}
export default observer(UserSettings);