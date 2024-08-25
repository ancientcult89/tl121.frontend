import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {unauthRedirect} from "../../../utils/unauthRedirect";
import {deleteUser, getUserList} from "../../../http/userApi";


const useUserList = () => {
    const {locale} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([])
    const [needUpdate, setNeedUpdate] = useState(true);

    useEffect(() => {
        getUsers();
    }, [needUpdate])

    function getUsers() {
        getUserList()
            .then(data => {
                setUsers(formUsers(data));
            })
            .catch(e => {
                unauthRedirect(e);
            })
            .finally(() => setIsLoading(false));
    }

    function formUsers(data) {
        let users = [];
        data.map(user => users.push({
            id: user.id,
            userName: user.userName,
            email: user.email,
            roleName: user.role?.roleName,
            roleId: user.roleId,
        }))
        return users;
    }

    function delUser(userId) {
        setIsLoading(true);
        deleteUser(userId)
            .then(() => getUsers())
            .catch(e => unauthRedirect(e))
            .finally(() => setIsLoading(false));
    }

    return {
        locale,
        modalType,
        setModalType,
        modalVisible,
        setModalVisible,
        selectedUserId,
        setSelectedUserId,
        delUser,
        isLoading,
        setIsLoading,
        users,
        needUpdate,
        setNeedUpdate,
    };
};

export default useUserList;