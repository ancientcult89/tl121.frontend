import {observer} from "mobx-react-lite";
import {Alert, Button, Form, Input, Popconfirm, Space} from 'antd';
import {ONE_TWO_ONE_DEADLINES_ROUTE} from "../../utils/consts";
import {login, recoveryPassword, registration} from "../../http/userApi";
import {emailValidator} from "../../utils/emailValidator";
import {localeConverter} from "../../utils/localeConverter";
import BackEndErrorBox from "../../components/Form/ErrorBox/BackEndErrorBox";
import AlertSuccess from "../../components/Form/Alerts/AlertSuccess";
import useAuth from "./useAuth";
import ErrorBox from "../../components/Form/ErrorBox/ErrorBox";


const Auth = observer(({isLogin}) => {
    const {
        locale,
        loginError,
        completeTaskHandler,
        email,
        password,
        user,
        navigate,
        executeErrorHandlers,
        confirmPassword,
        setIsLoginState,
        isLoginState,
        httpNotFoundRequestResponseError,
        httpBadRequestResponseError,
        isSuccessRegistration,
        userName,
        recoveryError,
        setConfirmPassword,
        setUserName,
        setEmail,
        setPassword,
        click,
    } = useAuth(isLogin);

    const loginErrorBar = (
        <div>
            <span>{loginError}. </span>
            <Space size="middle">
                <Popconfirm
                    title={locale.locale.Task.CompleteTask}
                    description={locale.locale.User.RecoveryPasswordConfirmation}
                    onConfirm={() => completeTaskHandler(email)}
                    okText={locale.locale.Ok}
                    cancelText={locale.locale.NO}
                >
                    <a>
                        {locale.locale.User.ForgotThePassword}
                    </a>
                </Popconfirm>
            </Space>
        </div>
    );

    return (
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, marginTop: 100, marginBottom: 100, marginRight: "auto", marginLeft: "auto"}}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <BackEndErrorBox
                    httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
                    httpBadRequestResponseError={httpBadRequestResponseError}
                />
                <AlertSuccess message={locale.locale.Registered} isSuccess={isSuccessRegistration}/>
                {!isLoginState &&
                    <Form.Item
                        label={locale.locale.UserName}
                        name="user"
                        rules={[{ required: true, message: locale.locale.UserNameRequiredMessage }]}
                    >
                        <Input value={userName} onChange={e => setUserName(e.target.value)}/>
                    </Form.Item>
                }
                {loginError && isLoginState &&
                    <div>
                        <Alert
                            message={loginErrorBar}
                            type="error"
                            showIcon
                        />
                        <p></p>
                    </div>
                }
                <ErrorBox error={recoveryError}/>
                <Form.Item
                    label={locale.locale.Email}
                    name="email"
                    rules={[{ required: true, message: locale.locale.EmailNameRequiredMessage, type: "email" }]}
                >
                    <Input value={email} onChange={e => setEmail(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    label={locale.locale.Password}
                    name="password"
                    rules={[{ required: true, message: locale.locale.PasswordRequiredMessage }]}
                >
                    <Input.Password value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Item>
                {!isLoginState &&
                    <Form.Item
                        label={locale.locale.ConfirmPassword}
                        name="confirmPassword"
                        rules={[{ required: true, message: locale.locale.PasswordConfirmationRequiredMessage }]}
                    >
                        <Input.Password value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                    </Form.Item>
                }
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" onClick={click} htmlType={"submit"} style={{marginRight: 5}}>
                        {isLoginState ? locale.locale.SignIn : locale.locale.Register}
                    </Button>
                    {locale.locale.Or} <a onClick={() => {
                        setIsLoginState(!isLoginState);
                    }}>
                        {!isLoginState ? locale.locale.SignIn : locale.locale.Register}
                    </a>
                </Form.Item>
            </Form>
    );
});

export default Auth;