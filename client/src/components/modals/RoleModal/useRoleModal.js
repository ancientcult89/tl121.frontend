import useHttpErrorHandling from "../../../hooks/useHttpErrorHandling";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {createRole, getRole, updateRole} from "../../../http/roleApi";
import {ADD_MODAL, EDIT_MODAL} from "../../../utils/consts";


const useRoleModal = ({modalType, open, onCancel, roleId}) => {
    const {
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        executeErrorHandlers,
        clearBackendErrors,
    } = useHttpErrorHandling();

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);
    const [roleNameError, setRoleNameError] = useState(null);
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
        clearBackendErrors();
        onCancel();
    }
    const clearErrors = () => {
        setRoleNameError(null);
        clearBackendErrors();
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

    return {
        locale,
        handleOk,
        confirmLoading,
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        roleName,
        setRoleName,
        roleNameError,
    };
};

export default useRoleModal;