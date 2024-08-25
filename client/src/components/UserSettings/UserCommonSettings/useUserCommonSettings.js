import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import { getUser, updateUser} from "../../../http/userApi";
import {emailValidator} from "../../../utils/emailValidator";
import useHttpErrorHandling from "../../../hooks/useHttpErrorHandling";


const useUserCommonSettings = (userId) => {
    const {
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        executeErrorHandlers,
    } = useHttpErrorHandling();


    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [selectedRoleName, setSelectedRoleName] = useState('');
    const [userNameError, setUserNameError] = useState(null);
    const [userEmailError, setEmailNameError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const {locale, role} = useContext(Context);

    useEffect(() => {
        if(userId != null)
        {
            getUser(userId).then(user => {
                setUserName(user.userName);
                setUserEmail(user.email);
                setSelectedRoleId(user.roleId);
                role.roles.map(role => role.roleId === user.roleId ? setSelectedRoleName(role.roleName) : () => {})
            });
        }
    }, [userId]);
    const handleOk = () => {
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
            .then(() => {
                setIsSaved(true);
            })
            .catch(e => {
                executeErrorHandlers(e)
            });
    };

    const selectRoleTypeHandler = (roleId) => {
        role.roles.map(item => {
            if(item.roleId === roleId)
            {
                setSelectedRoleName(item.roleName);
                setSelectedRoleId(item.roleId)
            }
        })
    }

    return {
        locale,
        isSaved,
        setIsSaved,
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        userNameError,
        setUserName,
        setUserNameError,
        userEmail,
        setUserEmail,
        selectRoleTypeHandler,
        selectedRoleName,
        handleOk,
        userName,
        userEmailError,
    };
};

export default useUserCommonSettings;