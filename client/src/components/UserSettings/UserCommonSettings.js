import {observer} from "mobx-react-lite";
import {emailValidator} from "../../utils/emailValidator";
import {getUser, updateUser} from "../../http/userApi";
import {Form, Input} from "antd";
import RoleSelector from "../ReferenceSelectors/RoleSelector";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import ErrorBox from "../Form/ErrorBox/ErrorBox";
import SaveButton from "../Form/Button/SaveButton";
import AlertSaved from "../Form/Alerts/AlertSaved";
import BackEndErrorBox from "../Form/ErrorBox/BackEndErrorBox";
import withHttpErrorHandling from "../../utils/withHttpErrorHandling";

const UserCommonSettings = (props) => {
    const {
        userId,
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        executeErrorHandlers,
        clearBackendErrors,
    } = props;

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

    return (
        <Form
            labelCol={{ span: 8 }}
        >
            <AlertSaved isSaved={isSaved} onClose={() => {setIsSaved(false)}}/>
            <BackEndErrorBox
                httpBadRequestResponseError={httpBadRequestResponseError}
                httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
            />
            <ErrorBox error={userNameError}/>
            <Form.Item label={locale.locale.User.UserName}>
                <Input
                    value={userName}
                    onChange={e => {setUserName(e.target.value)}}
                />
            </Form.Item>

            <ErrorBox error={userEmailError}/>
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

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <SaveButton onClick={handleOk}/>
            </Form.Item>
        </Form>
    );
};

export default observer(withHttpErrorHandling(UserCommonSettings));