import {observer} from "mobx-react-lite";
import {Form, Input} from "antd";
import RoleSelector from "../../ReferenceSelectors/RoleSelector/RoleSelector";
import ErrorBox from "../../Form/ErrorBox/ErrorBox";
import SaveButton from "../../Form/Button/SaveButton";
import AlertSuccess from "../../Form/Alerts/AlertSuccess";
import BackEndErrorBox from "../../Form/ErrorBox/BackEndErrorBox";
import useUserCommonSettings from "./useUserCommonSettings";

const UserCommonSettings = ({userId}) => {
    const {
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
    } = useUserCommonSettings(userId);



    return (
        <Form
            labelCol={{ span: 8 }}
        >
            <AlertSuccess isSuccess={isSaved} onClose={() => {setIsSaved(false)}}/>
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

export default observer(UserCommonSettings);