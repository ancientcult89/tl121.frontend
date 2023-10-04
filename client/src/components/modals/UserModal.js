import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {createRole, getRole, updateRole} from "../../http/roleApi";
import {getUser} from "../../http/userApi";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {Alert, Form, Input, Modal} from "antd";

const UserModal = ({modalType, open, onCancel, userId}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [userNameError, setUserNameError] = useState(null)
    const {locale, role} = useContext(Context);

    useEffect(() => {
        setConfirmLoading(true);
        if(userId != null)
        {
            getUser(userId).then(user => {
                setUserName(user.userName);
                setSelectedUser(user)
            });
        }
        setConfirmLoading(false);
    }, [userId]);

    const handleOk = () => {
        if(userName == null || userName === "")
        {
            // setRoleNameError(locale.locale.Role.NameValidationError);
            return;
        }
        // if(modalType === ADD_MODAL)
        // {
        //     createRole(roleName)
        //         .then(newRole =>{
        //             role.setRoles([...role.roles, newRole])
        //             setSelectedRole(null);
        //             setRoleName('');
        //             onCancel();
        //         })
        //         .catch(e => unauthRedirect(e));
        // }
        // else if(modalType === EDIT_MODAL)
        // {
        //     updateRole(selectedRole.roleId, roleName)
        //         .then((updatedRole) =>{
        //             role.setRoles(role.roles.map((item) => item.roleId === updatedRole.roleId ? {...updatedRole} : item))
        //             setSelectedRole(null);
        //             setRoleName('');
        //             onCancel();
        //         })
        //         .catch(e => unauthRedirect(e));
        // }
    };

    return (
        <Modal
            title={modalType === ADD_MODAL ? locale.locale.Role.Add : locale.locale.Role.Edit}
            open={open}
            destroyOnClose={true}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
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
            <Form>
                <Form.Item label={locale.locale.Role.GradeName}>
                    <Input
                        value={userName}
                        onChange={e => {setUserName(e.target.value)}}
                    ></Input>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default observer(UserModal);