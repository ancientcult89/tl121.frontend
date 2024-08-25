import {observer} from "mobx-react-lite";
import {Form} from "antd";
import InputText from "../../Form/Input/InputText";
import InputPassword from "../../Form/Input/InputPassword";
import SaveButton from "../../Form/Button/SaveButton";
import AlertSuccess from "../../Form/Alerts/AlertSuccess";
import BackEndErrorBox from "../../Form/ErrorBox/BackEndErrorBox";
import withHttpErrorHandling from "../../../utils/withHttpErrorHandling";
import useUserMailSettings from "./useUserMailSettings";

const UserMailSettings = ({userId}) => {
    const {
        locale,
        isSaved,
        setIsSaved,
        httpNotFoundRequestResponseError,
        httpBadRequestResponseError,
        displayName,
        setDisplayName,
        displayNameError,
        emailPassword,
        setEmailPassword,
        emailPasswordError,
        emailHostAddress,
        setEmailHostAddress,
        emailPort,
        setEmailPort,
        emailHostAddressError,
        emailPortError,
        handleOk,
    } = useUserMailSettings(userId);

    return (
        <Form
            labelCol={{ span: 8 }}
        >
            <AlertSuccess isSuccess={isSaved} onClose={() => {setIsSaved(false)}}/>
            <BackEndErrorBox
                httpBadRequestResponseError={httpBadRequestResponseError}
                httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
            />
            <InputText
                localisation={locale.locale.UserMailSettings.DisplayName}
                value={displayName}
                onChange={setDisplayName}
                error={displayNameError}
            />
            <InputPassword
                localisation={locale.locale.UserMailSettings.EmailPassword}
                value={emailPassword}
                onChange={setEmailPassword}
                error={emailPasswordError}
            />
            <InputText
                localisation={locale.locale.UserMailSettings.EmailHostAddress}
                value={emailHostAddress}
                onChange={setEmailHostAddress}
                error={emailHostAddressError}
            />
            <InputText
                localisation={locale.locale.UserMailSettings.EmailPort}
                value={emailPort}
                onChange={setEmailPort}
                error={emailPortError}
            />

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <SaveButton onClick={handleOk}/>
            </Form.Item>
        </Form>
    );
};

export default observer(UserMailSettings);