import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {changePassword, getUser, updateUser} from "../../http/userApi";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {Alert, Form, Input, Modal, Row, Switch} from "antd";
import RoleSelector from "../ReferenceSelectors/RoleSelector";
import {emailValidator} from "../../utils/emailValidator";

const UserModal = ({modalType, open, onCancel, userId}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [selectedRoleName, setSelectedRoleName] = useState('');
    const [userNameError, setUserNameError] = useState(null);
    const [userEmailError, setEmailNameError] = useState(null);
    const [changePasswordFlag, setChangePasswordFlag] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState(null);
    const [newPasswordError, setNewPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [confirmationError, setConfirmationError] = useState(null);
    const {locale, role} = useContext(Context);

    useEffect(() => {
        setConfirmLoading(true);
        if(userId != null)
        {
            getUser(userId).then(user => {
                setUserName(user.userName);
                setUserEmail(user.email);
                setSelectedRoleId(user.roleId);
                role.roles.map(role => role.roleId === user.roleId ? setSelectedRoleName(role.roleName) : () => {})
            });
        }
        setConfirmLoading(false);
    }, [userId]);

    const selectRoleTypeHandler = (roleId) => {
        role.roles.map(item => {
            if(item.roleId === roleId)
            {
                setSelectedRoleName(item.roleName);
                setSelectedRoleId(item.roleId)
            }
        })
    }

    const handleOk = () => {

        if(changePasswordFlag)
        {
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
                .then(data =>{
                    onCancel();
                })
                .catch(e => unauthRedirect(e));
        }
        else
        {
            let emailIsValid = emailValidator(userEmail);
            if(userName == null || userName === "" || userEmail == null || !emailIsValid)
            {
                if(userName == null || userName === "") {
                    setUserNameError(locale.locale.User.NameValidationError);
                }
                else {
                    setUserNameError(null);
                }
                if(userEmail == null || !emailIsValid) {
                    setEmailNameError(locale.locale.User.EmailValidationError);
                }
                else {
                    setEmailNameError(null);
                }
                return;
            }

            let formData = {
                "id": userId,
                "userName": userName,
                "email": userEmail,
                "roleId": selectedRoleId,
            }

            updateUser(formData)
                .then((updatedUser) =>{
                    setUserName(null);
                    setUserEmail(null);
                    setSelectedRoleId(null);
                    setSelectedRoleName(null)
                    onCancel();
                })
                .catch(e => unauthRedirect(e));
        }
    };

    const onChange = (checked) => {
        setChangePasswordFlag(checked);
    };

    return (
        <Modal
            title={modalType === locale.locale.User.Edit}
            open={open}
            destroyOnClose={true}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
        >
            <Row>
                <Form.Item label={locale.locale.User.ChangePassword}>
                    <Switch onChange={onChange}  checked={changePasswordFlag}/>
                </Form.Item>
            </Row>
            {!changePasswordFlag &&
                <Form
                    labelCol={{ span: 8 }}
                >
                    {userNameError &&
                        <div>
                            <Alert
                                message={userNameError}
                                type="error"
                                showIcon
                            />
                            <p></p>
                        </div>
                    }
                    <Form.Item label={locale.locale.User.UserName}>
                        <Input
                            value={userName}
                            onChange={e => {setUserName(e.target.value)}}
                        />
                    </Form.Item>
                    {userEmailError &&
                        <div>
                            <Alert
                                message={userEmailError}
                                type="error"
                                showIcon
                            />
                            <p></p>
                        </div>
                    }
                    <Form.Item label={locale.locale.User.Email}>
                        <Input
                            value={userEmail}
                            onChange={e => {setUserEmail(e.target.value)}}
                        ></Input>
                    </Form.Item>
                    <Form.Item label={locale.locale.User.Role}>
                        <RoleSelector
                            onSelect={selectRoleTypeHandler}
                            selectedRoleName={selectedRoleName}
                        />
                    </Form.Item>
                </Form>
            }
            {changePasswordFlag &&
                <Form
                    labelCol={{ span: 8 }}
                >
                    {confirmationError &&
                        <div>
                            <Alert
                                message={confirmationError}
                                type="error"
                                showIcon
                            />
                            <p></p>
                        </div>
                    }
                    {currentPasswordError &&
                        <div>
                            <Alert
                                message={currentPasswordError}
                                type="error"
                                showIcon
                            />
                            <p></p>
                        </div>
                    }
                    <Form.Item label={locale.locale.User.CurrentPassword}>
                        <Input.Password
                            value={currentPassword}
                            onChange={e => {setCurrentPassword(e.target.value)}}
                        />
                    </Form.Item>
                    {newPasswordError &&
                        <div>
                            <Alert
                                message={newPasswordError}
                                type="error"
                                showIcon
                            />
                            <p></p>
                        </div>
                    }
                    <Form.Item label={locale.locale.User.NewPassword}>
                        <Input.Password
                            value={newPassword}
                            onChange={e => {setNewPassword(e.target.value)}}
                        />
                    </Form.Item>
                    {confirmPasswordError &&
                        <div>
                            <Alert
                                message={confirmPasswordError}
                                type="error"
                                showIcon
                            />
                            <p></p>
                        </div>
                    }
                    <Form.Item label={locale.locale.User.ConfirmPassword}>
                        <Input.Password
                            value={confirmPassword}
                            onChange={e => {setConfirmPassword(e.target.value)}}
                        />
                    </Form.Item>
                </Form>
            }
        </Modal>
    );
};

export default observer(UserModal);