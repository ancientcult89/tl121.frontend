import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {createRole, getRole, updateRole} from "../../http/roleApi";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {Alert, Form, Input, Modal} from "antd";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {badHttpRequestHandler} from "../../utils/badHttpRequestHandler";
import {notFoundHttpRequestHandler} from "../../utils/notFoundHttpRequestHandler";
import BackEndErrorBox from "../Form/ErrorBox/BackEndErrorBox";

const RoleModal = ({modalType, open, onCancel, roleId}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);
    const [roleNameError, setRoleNameError] = useState(null);
    const [httpBadRequestResponseError, setHttpBadRequestResponseError] = useState(null);
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);
    const {locale, role} = useContext(Context);

    useEffect(() => {
        setConfirmLoading(true);
        if(roleId != null)
        {
            getRole(roleId)
                .then(role => {
                    setRoleName(role.roleName);
                    setSelectedRole(role)
                })
                .catch(e => {
                    executeErrorHandlers(e);
                });
        }
        setConfirmLoading(false);
    }, [roleId]);

    const successfullyRequestHandler = () => {
        setSelectedRole(null);
        setRoleNameError('');
        onCancel();
    }
    const clearErrors = () => {
        setRoleNameError(null);
        setHttpBadRequestResponseError(null);
    }

    const executeErrorHandlers = (e) => {
        unauthRedirect(e);
        setHttpBadRequestResponseError(badHttpRequestHandler(e));
        setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
    }

    const handleOk = () => {
        if(httpNotFoundRequestResponseError !== null)
        {
            return;
        }
        clearErrors();
        if(roleName == null || roleName === "")
        {
            setRoleNameError(locale.locale.Role.NameValidationError);
            return;
        }
        if(modalType === ADD_MODAL)
        {
            createRole(roleName)
                .then(newRole =>{
                    role.setRoles([...role.roles, newRole])
                    successfullyRequestHandler();
                })
                .catch(e => executeErrorHandlers(e));
        }
        else if(modalType === EDIT_MODAL)
        {
            updateRole(selectedRole.roleId, roleName)
                .then((updatedRole) =>{
                    role.setRoles(role.roles.map((item) => item.roleId === updatedRole.roleId ? {...updatedRole} : item))
                    successfullyRequestHandler();
                })
                .catch(e => executeErrorHandlers(e));
        }
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
            <BackEndErrorBox
                httpBadRequestResponseError={httpBadRequestResponseError}
                httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
            />
            {roleNameError &&
                <div>
                    <Alert
                        message={roleNameError}
                        type="error"
                        showIcon
                    />
                    <p></p>
                </div>
            }
            <Form
                labelCol={{ span: 8 }}
            >
                <Form.Item label={locale.locale.Role.GradeName}>
                    <Input
                        value={roleName}
                        onChange={e => {setRoleName(e.target.value)}}
                    ></Input>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default observer(RoleModal);