import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Alert, Button, Form, Input} from 'antd';
import {useNavigate} from "react-router-dom";
import {ONE_TWO_ONE_DEADLINES_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {login, registration} from "../http/userApi";
import {emailValidator} from "../utils/emailValidator";
import {localeConverter} from "../utils/localeConverter";


const Auth = observer(({isLogin}) => {
    const {user, locale} = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoginState, setIsLoginState] = useState(isLogin);
    const [loginError, setLoginError] = useState(null);

    useEffect(() => {
        user.setIsAuth(false);
    }, [])

    const click = async () => {
        try {
            let emailIsValid = emailValidator(email);
            if(password === '' || !emailIsValid)
            {
                return;
            }
            if(isLoginState) {
                const loginResponse = await login(email, password);
                user.setUser(loginResponse.user);
                let usersLocale = localeConverter.idToString(loginResponse.user.locale);
                locale.setLocale(usersLocale);
                user.setRole(loginResponse.role?.roleName);
                localStorage.setItem('role', loginResponse.role?.roleName);
                user.setIsAuth(true);
                navigate(ONE_TWO_ONE_DEADLINES_ROUTE);
            }
            else {
                let emailIsValid = emailValidator(email);
                if(userName === '' || !emailIsValid || password === '' || confirmPassword === '' || password !== confirmPassword)
                {
                    return;
                }

                const formData = {
                    email: email,
                    userName: userName,
                    password: password,
                    confirmPassword: confirmPassword,
                }
                await registration(formData);
                setPassword('');
                setConfirmPassword('');
                setIsLoginState(!isLoginState);
            }
        }
        catch (e)
        {
            if(e.code !== 'ERR_NETWORK' && Number(e.response.status) === 400)
            {
                setLoginError(locale.locale.LoginError)
            }
        }
    }

    return (
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, marginTop: 100, marginBottom: 100, marginRight: "auto", marginLeft: "auto"}}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
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
                            message={loginError}
                            type="error"
                            showIcon
                        />
                        <p></p>
                    </div>

                }
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
                    Or <a onClick={() => {
                        setIsLoginState(!isLoginState);
                    }}>
                        {!isLoginState ? locale.locale.SignIn : locale.locale.Register}
                    </a>
                </Form.Item>
            </Form>
    );
});

export default Auth;