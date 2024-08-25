import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import { getUserMailSettings, setUserMailSettings } from "../../../http/userApi";
import useHttpErrorHandling from "../../../hooks/useHttpErrorHandling";
import {isNullOrWhiteSpace} from "../../../utils/isNullOrWhiteSpace";
import {isNumber} from "../../../utils/isNumber";


const useUserMailSettings = (userId) => {
    const {
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        executeErrorHandlers,
        clearBackendErrors,
    } = useHttpErrorHandling();

    const [displayName, setDisplayName] = useState('');
    const [emailPassword, setEmailPassword] = useState('');
    const [emailHostAddress, setEmailHostAddress] = useState(null);
    const [emailPort, setEmailPort] = useState('');
    const [userMailSettingId, setUserMailSettingId] = useState('');
    const [displayNameError, setDisplayNameError] = useState(null);
    const [emailPasswordError, setEmailPasswordError] = useState(null);
    const [emailHostAddressError, setEmailHostAddressError] = useState(null);
    const [emailPortError, setEmailPortError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const {locale} = useContext(Context);

    useEffect(() => {
        if(userId != null)
        {
            getUserMailSettings(userId)
                .then(userMailSettings => {
                    setDisplayName(userMailSettings.displayName);
                    setEmailPassword(userMailSettings.emailPassword);
                    setEmailHostAddress(userMailSettings.emailHostAddress);
                    setEmailPort(userMailSettings.emailPort);
                    setUserMailSettingId(userMailSettings.userMailSettingId);
                })
                .catch(e => executeErrorHandlers(e));
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

        function clearErrors (){
            setDisplayNameError(null);
            setEmailPasswordError(null);
            setEmailHostAddressError(null);
            setEmailPortError(null);
            clearBackendErrors();
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
            .then(() => {
                clearErrors();
                setIsSaved(true);
            })
            .catch(e => executeErrorHandlers(e));
    };


    return {
        locale,
        isSaved,
        setIsSaved,
        httpNotFoundRequestResponseError,
        httpBadRequestResponseError,
        displayName,
        setDisplayName,
        displayNameError,
        setDisplayNameError,
        emailPassword,
        setEmailPassword,
        emailPasswordError,
        setEmailPasswordError,
        emailHostAddress,
        setEmailHostAddress,
        emailPort,
        setEmailPort,
        emailHostAddressError,
        emailPortError,
        handleOk,
    };
};

export default useUserMailSettings;