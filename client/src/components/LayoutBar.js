import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {
    TeamOutlined,
    BookOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {GRADE_ROUTE, LOGIN_ROUTE, PERSON_ROUTE} from "../utils/consts";
import AppRouter from "./AppRouter";

const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('1-2-1', '1', <TeamOutlined />),
    getItem('Login', LOGIN_ROUTE),
    getItem('References', 'sub1', <BookOutlined />, [
        getItem('Person', PERSON_ROUTE),
        getItem('Grade', GRADE_ROUTE),
    ]),
];


const LayoutBar = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState('mail');
    const {user} = useContext(Context);
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onClick = (e) => {
        console.log('user is auth: ' + user._isAuth);
        navigate(e.key);
        setCurrent(e.key);
    };
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onClick} selectedKeys={[current]}/>
            </Sider>
            <Layout>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '10px 0',
                        }}
                    >
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        <AppRouter/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutBar;