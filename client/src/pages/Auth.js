import {observer} from "mobx-react-lite";
import React, {useContext, useState} from "react";
import {Alert, Button, Form, Input} from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, ONE_TWO_ONE_DEADLINES_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {login, registration} from "../http/userApi";


const Auth = observer(() => {
    const {user, locale} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null)
    const click = async () => {
        try {
            let authRespose;
            //if(isLogin) {
            authRespose = await login(email, password);

            //}
/*            else {
                authRespose = await  registration(email, password);
                console.log(authRespose)
            }*/
            user.setUser(user);
            user.setIsAuth(true);
            navigate(ONE_TWO_ONE_DEADLINES_ROUTE);
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
                {loginError &&
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
                    label={locale.locale.UserName}
                    name="user"
                    rules={[{ required: true, message: locale.locale.UserNameRequiredMessage, type: "email" }]}
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
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" onClick={click} htmlType={"submit"}>
                        {locale.locale.Submit}
                    </Button>
                </Form.Item>
            </Form>
    );
});

export default Auth;