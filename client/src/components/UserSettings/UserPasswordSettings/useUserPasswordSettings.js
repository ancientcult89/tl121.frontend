import React, {useContext, useState} from "react";
import {Context} from "../../../index";
import {changePassword} from "../../../http/userApi";
import useHttpErrorHandling from "../../../hooks/useHttpErrorHandling";


const useUserPasswordSettings = (userId) => {
    const {
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        executeErrorHandlers,
        clearBackendErrors,
    } = useHttpErrorHandling();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState(null);
    const [newPasswordError, setNewPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [confirmationError, setConfirmationError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const {locale} = useContext(Context);

    const handleOk = () => {
        if(currentPassword === '' || newPassword === '' || confirmPassword === '' || newPassword !== confirmPassword)
        {
            if(currentPassword === '')
                setCurrentPasswordError(locale.locale.User.CurrentPassValidationError);
            else
                setCurrentPasswordError(null);
            if(newPassword === '')
                setNewPasswordError(locale.locale.User.NewPassValidationError);
            else
                setNewPasswordError(null);
            if(confirmPassword === '')
                setConfirmPasswordError(locale.locale.User.CurrentPassValidationError);
            else
                setConfirmPasswordError(null);
            if(newPassword !== confirmPassword)
                setConfirmationError(locale.locale.User.PasswordConfirmationError);
            else
                setConfirmationError(null);
            return;
        }

        let formData = {
            "userId": userId,
            "currentPassword": currentPassword,
            "newPassword": newPassword,
            "confirmPassword": confirmPassword,
        }
        changePassword(formData)
            .then(() => {
                setIsSaved(true);
                clearBackendErrors();
            })
            .catch(e => executeErrorHandlers(e));
    };

    return {
        locale,
        isSaved,
        setIsSaved,
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        confirmationError,
        currentPasswordError,
        currentPassword,
        setCurrentPassword,
        newPasswordError,
        confirmPassword,
        setConfirmPassword,
        newPassword,
        setNewPassword,
        confirmPasswordError,
        handleOk,
    };
};

export default useUserPasswordSettings;