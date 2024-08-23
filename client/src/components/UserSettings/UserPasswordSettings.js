import {observer} from "mobx-react-lite";
import {Form, Input} from "antd";
import React, {useContext, useState} from "react";
import {changePassword} from "../../http/userApi";
import {Context} from "../../index";
import SaveButton from "../Form/Button/SaveButton";
import BackEndErrorBox from "../Form/ErrorBox/BackEndErrorBox";
import AlertSaved from "../Form/Alerts/AlertSaved";
import ErrorBox from "../Form/ErrorBox/ErrorBox";
import withHttpErrorHandling from "../../utils/withHttpErrorHandling";

const UserPasswordSettings = (props) => {
    const {
        userId,
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        executeErrorHandlers,
        clearBackendErrors,
    } = props;

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

    return (
        <Form
            labelCol={{ span: 8 }}
        >
            <AlertSaved isSaved={isSaved} onClose={() => {setIsSaved(false)}}/>
            <BackEndErrorBox
                httpBadRequestResponseError={httpBadRequestResponseError}
                httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
            />
            <ErrorBox error={confirmationError}/>
            <ErrorBox error={currentPasswordError}/>
            <Form.Item label={locale.locale.User.CurrentPassword}>
                <Input.Password
                    value={currentPassword}
                    onChange={e => {setCurrentPassword(e.target.value)}}
                />
            </Form.Item>
            <ErrorBox error={newPasswordError}/>
            <Form.Item label={locale.locale.User.NewPassword}>
                <Input.Password
                    value={newPassword}
                    onChange={e => {setNewPassword(e.target.value)}}
                />
            </Form.Item>
            <ErrorBox error={confirmPasswordError}/>
            <Form.Item label={locale.locale.User.ConfirmPassword}>
                <Input.Password
                    value={confirmPassword}
                    onChange={e => {setConfirmPassword(e.target.value)}}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <SaveButton onClick={handleOk}/>
            </Form.Item>
        </Form>
    );
}

export default observer(withHttpErrorHandling(UserPasswordSettings));