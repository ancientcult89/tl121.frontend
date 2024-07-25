import {observer} from "mobx-react-lite";
import {getUserMailSettings, setUserMailSettings} from "../../http/userApi";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {Button, Form} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import InputText from "../Form/Input/InputText";
import {isNullOrWhiteSpace} from "../../utils/isNullOrWhiteSpace";
import {isNumber} from "../../utils/isNumber";
import InputPassword from "../Form/Input/InputPassword";

const UserMailSettings = ({userId}) => {
    const [displayName, setDisplayName] = useState('');
    const [emailPassword, setEmailPassword] = useState('');
    const [emailHostAddress, setEmailHostAddress] = useState(null);
    const [emailPort, setEmailPort] = useState('');
    const [userMailSettingId, setUserMailSettingId] = useState('');
    const [displayNameError, setDisplayNameError] = useState(null);
    const [emailPasswordError, setEmailPasswordError] = useState(null);
    const [emailHostAddressError, setEmailHostAddressError] = useState(null);
    const [emailPortError, setEmailPortError] = useState(null);
    const {locale} = useContext(Context);

    useEffect(() => {
        if(userId != null)
        {
            getUserMailSettings(userId).then(userMailSettings => {
                setDisplayName(userMailSettings.displayName);
                setEmailPassword(userMailSettings.emailPassword);
                setEmailHostAddress(userMailSettings.emailHostAddress);
                setEmailPort(userMailSettings.emailPort);
                setUserMailSettingId(userMailSettings.userMailSettingId);
            });
        }
    }, [userId]);
    const handleOk = () => {
        if(isNullOrWhiteSpace(displayName) || isNullOrWhiteSpace(displayName)
            || isNullOrWhiteSpace(emailPassword) || isNullOrWhiteSpace(emailHostAddress)
            || isNullOrWhiteSpace(emailPort) || !isNumber(emailPort))
        {
            if(isNullOrWhiteSpace(displayName)) {
                setDisplayNameError(locale.locale.UserMailSettings.DisplayNameError);
            }
            else {
                setDisplayNameError(null);
            }
            if(isNullOrWhiteSpace(emailPassword)) {
                setEmailPasswordError(locale.locale.UserMailSettings.EmailPasswordError);
            }
            else {
                setEmailPasswordError(null);
            }
            if(isNullOrWhiteSpace(emailHostAddress)) {
                setEmailHostAddressError(locale.locale.UserMailSettings.EmailHostAddressError);
            }
            else {
                setEmailHostAddressError(null);
            }
            if(isNullOrWhiteSpace(emailPort) || !isNumber(emailPort)) {
                setEmailPortError(locale.locale.UserMailSettings.EmailPortError);
            }
            else {
                setEmailPortError(null);
            }
            return;
        }

        let formData = {
            "userId": userId,
            "displayName": displayName,
            "emailPassword": emailPassword,
            "emailHostAddress": emailHostAddress,
            "emailPort": emailPort,
            "userMailSettingId": userMailSettingId,
        }
        setUserMailSettings(formData)
            .catch(e => unauthRedirect(e));
    };

    return (
        <Form
            labelCol={{ span: 8 }}
        >
            <InputText
                localisation={locale.locale.UserMailSettings.DisplayName}
                value={displayName}
                onChange={setDisplayName}
                error={displayNameError}
            />
            <InputPassword
                localisation={locale.locale.UserMailSettings.EmailPassword}
                value={emailPassword}
                onChange={setEmailPassword}
                error={emailPasswordError}
            />
            <InputText
                localisation={locale.locale.UserMailSettings.EmailHostAddress}
                value={emailHostAddress}
                onChange={setEmailHostAddress}
                error={emailHostAddressError}
            />
            <InputText
                localisation={locale.locale.UserMailSettings.EmailPort}
                value={emailPort}
                onChange={setEmailPort}
                error={emailPortError}
            />

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button onClick={handleOk} type={"primary"}>
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default observer(UserMailSettings);