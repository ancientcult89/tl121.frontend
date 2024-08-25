import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {notFoundHttpRequestHandler} from "../../../utils/notFoundHttpRequestHandler";
import {unauthRedirect} from "../../../utils/unauthRedirect";
import {deleteRole, getRoleList} from "../../../http/roleApi";


const useRoleList = () => {
    const {locale, role} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [needUpdate, setNeedUpdate] = useState(true);
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);

    useEffect(() => {
        getRoles();
        setIsLoading(false);
    }, [needUpdate])

    function getRoles() {
        getRoleList()
            .then(data => role.setRoles(data))
            .catch(e => {
                unauthRedirect(e);
            })
    }

    function delRole(roleId) {
        setIsLoading(true);
        deleteRole(roleId)
            .then(() => getRoles())
            .catch(e => {
                unauthRedirect(e);
                setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
            })
            .finally(() => setIsLoading(false));
    }

    return {
        locale,
        setModalVisible,
        modalVisible,
        setSelectedRoleId,
        selectedRoleId,
        setIsLoading,
        isLoading,
        httpNotFoundRequestResponseError,
        setHttpNotFoundRequestResponseError,
        role,
        setModalType,
        modalType,
        needUpdate,
        setNeedUpdate,
        delRole,
    };
};

export default useRoleList;