import {observer} from "mobx-react-lite";
import {Form, Input} from "antd";
import React, {useContext, useState} from "react";
import {changePassword} from "../../../http/userApi";
import {Context} from "../../../index";
import SaveButton from "../../Form/Button/SaveButton";
import BackEndErrorBox from "../../Form/ErrorBox/BackEndErrorBox";
import AlertSuccess from "../../Form/Alerts/AlertSuccess";
import ErrorBox from "../../Form/ErrorBox/ErrorBox";
import withHttpErrorHandling from "../../../utils/withHttpErrorHandling";
import useUserPasswordSettings from "./useUserPasswordSettings";

const UserPasswordSettings = ({userId}) => {
    const {
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
    } = useUserPasswordSettings(userId);



    return (
        <Form
            labelCol={{ span: 8 }}
        >
            <AlertSuccess isSuccess={isSaved} onClose={() => {setIsSaved(false)}}/>
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

export default observer(UserPasswordSettings);