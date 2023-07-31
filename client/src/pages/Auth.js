import {observer} from "mobx-react-lite";
import React, {useContext, useState} from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import {GRADE_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {login, registration} from "../http/userApi";


const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let authRespose;
            if(isLogin) {
                authRespose = await  login(email, password);
            }
            else {
                authRespose = await  registration(email, password);
                console.log(authRespose)
            }
            user.setUser(user);
            user.setIsAuth(true);
            navigate(GRADE_ROUTE);
        }
        catch (e)
        {
            alert(e.response.date.message())
        }
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
});

export default Auth;