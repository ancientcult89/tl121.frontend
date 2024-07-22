import {observer} from "mobx-react-lite";
import {emailValidator} from "../../utils/emailValidator";
import {getUser, getUserMailSettings, setUserMailSettings, updateUser} from "../../http/userApi";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {Alert, Button, Form, Input} from "antd";
import RoleSelector from "../ReferenceSelectors/RoleSelector";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../index";

const UserMailSettings = ({userId, onCancel}) => {
    const [displayName, setDisplayName] = useState('');
    const [emailPassword, setEmailPassword] = useState('');
    const [emailHostAddress, setEmailHostAddress] = useState(null);
    const [emailPort, setEmailPort] = useState('');
    const [userMailSettingId, setUserMailSettingId] = useState('');
    // const [userNameError, setUserNameError] = useState(null);
    // const [userEmailError, setEmailNameError] = useState(null);
    const {locale, role} = useContext(Context);

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
        // if(displayName == null || emailPassword === "" || emailHostAddress == null || emailPort === "")
        // {
        //     // if(userName == null || userName === "") {
        //     //     setUserNameError(locale.locale.User.NameValidationError);
        //     // }
        //     // else {
        //     //     setUserNameError(null);
        //     // }
        //     // if(userEmail == null || !emailIsValid) {
        //     //     setEmailNameError(locale.locale.User.EmailValidationError);
        //     // }
        //     // else {
        //     //     setEmailNameError(null);
        //     // }
        //     return;
        // }

        let formData = {
            "userId": userId,
            "displayName": displayName,
            "emailPassword": emailPassword,
            "emailHostAddress": emailHostAddress,
            "emailPort": emailPort,
            "userMailSettingId": userMailSettingId,
        }
        console.log(formData);
        setUserMailSettings(formData)
            .catch(e => unauthRedirect(e));
    };

    return (
        <Form
            labelCol={{ span: 8 }}
        >
            <Form.Item label={locale.locale.UserMailSettings.DisplayName}>
                <Input
                    value={displayName}
                    onChange={e => {setDisplayName(e.target.value)}}
                ></Input>
            </Form.Item>
            <Form.Item label={locale.locale.UserMailSettings.EmailPassword}>
                <Input.Password
                    value={emailPassword}
                    onChange={e => {setEmailPassword(e.target.value)}}
                ></Input.Password>
            </Form.Item>
            <Form.Item label={locale.locale.UserMailSettings.EmailHostAddress}>
                <Input
                    value={emailHostAddress}
                    onChange={e => {setEmailHostAddress(e.target.value)}}
                ></Input>
            </Form.Item>
            <Form.Item label={locale.locale.UserMailSettings.EmailPort}>
                <Input
                    value={emailPort}
                    onChange={e => {setEmailPort(e.target.value)}}
                ></Input>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button onClick={handleOk} type={"primary"}>
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default observer(UserMailSettings);