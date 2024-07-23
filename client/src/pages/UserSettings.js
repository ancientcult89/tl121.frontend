import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Spin} from "antd";
import {Context} from "../index";
import {getCurrentUser} from "../http/userApi";
import {unauthRedirect} from "../utils/unauthRedirect";
import UserCommonSettings from "../components/UserSettings/UserCommonSettings";
import UserMailSettings from "../components/UserSettings/UserMailSettings";
import UserPasswordSettings from "../components/UserSettings/UserPasswordSettings";

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
            <div>
                <UserCommonSettings
                    userId={userId}
                />
                <UserMailSettings
                    userId={userId}
                />
                <UserPasswordSettings
                    userId={userId}
                />
            </div>
        </Spin>
    )
}
export default observer(UserSettings);