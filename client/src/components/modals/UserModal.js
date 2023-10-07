import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {createRole, getRole, updateRole} from "../../http/roleApi";
import {getUser, updateUser} from "../../http/userApi";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {Alert, Form, Input, Modal} from "antd";
import RoleSelector from "../ReferenceSelectors/RoleSelector";
import {emailValidator} from "../../utils/emailValidator";

const UserModal = ({modalType, open, onCancel, userId}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [selectedRoleName, setSelectedRoleName] = useState('');
    const [userNameError, setUserNameError] = useState(null);
    const [userEmailError, setEmailNameError] = useState(null);
    const {locale, role} = useContext(Context);

    useEffect(() => {
        setConfirmLoading(true);
        if(userId != null)
        {
            getUser(userId).then(user => {
                console.log(user)
                setUserName(user.userName);
                setUserEmail(user.email);
                setSelectedRoleId(user.roleId);
                role.roles.map(role => role.roleId === user.roleId ? setSelectedRoleName(role.roleName) : () => {})
                setSelectedUser(user)
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
        let emailIsValid = emailValidator(userEmail);
        if(userName == null || userName === "" || userEmail == null || !emailIsValid)
        {
            if(userName == null || userName === "")
            {
                setUserNameError(locale.locale.User.NameValidationError);
            }
            else
            {
                setUserNameError(null);
            }
            if(userEmail == null || !emailIsValid)
            {
                setEmailNameError(locale.locale.User.EmailValidationError);
            }
            else
            {
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

        if(modalType === ADD_MODAL)
        {
            // createRole(roleName)
            //     .then(newRole =>{
            //         role.setRoles([...role.roles, newRole])
            //         setSelectedRole(null);
            //         setRoleName('');
            //         onCancel();
            //     })
            //     .catch(e => unauthRedirect(e));
        }
        else if(modalType === EDIT_MODAL)
        {
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

    return (
        <Modal
            title={modalType === ADD_MODAL ? locale.locale.User.Add : locale.locale.User.Edit}
            open={open}
            destroyOnClose={true}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
        >
            <Form
                labelCol={{ span: 5 }}
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
                    ></Input>
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
        </Modal>
    );
};

export default observer(UserModal);