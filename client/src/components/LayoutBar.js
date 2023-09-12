import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {
    TeamOutlined,
    BookOutlined,
    AppstoreOutlined,
    InsertRowAboveOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {
    GRADE_ROUTE,
    LOGIN_ROUTE,
    MEETING_ROUTE,
    ONE_TWO_ONE_DEADLINES_ROUTE, PERSON_PROJECTS_ROUTE,
    PERSON_ROUTE,
    PROJECT_ROUTE, ROLE_ROUTE, TASK_ROUTE
} from "../utils/consts";
import AppRouter from "./AppRouter";
import {enLocale} from "../locales/en-En";
import {observer} from "mobx-react-lite";

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const LayoutBar = observer(() => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState('mail');
    const {locale, user} = useContext(Context);
    const [selectedLocale, setSelectedLocale] = useState(enLocale)
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onClick = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    };

    const items = [
        getItem(locale.locale.Dashboard, ONE_TWO_ONE_DEADLINES_ROUTE, <InsertRowAboveOutlined />),
        getItem(locale.locale.MeetingReference, MEETING_ROUTE, <TeamOutlined />),
        getItem(locale.locale.TaskList, TASK_ROUTE, <UnorderedListOutlined />),
        getItem(locale.locale.References, 'sub1', <BookOutlined />, [
            getItem(locale.locale.PersonReference, PERSON_ROUTE),
            getItem(locale.locale.GradeReference, GRADE_ROUTE),
            getItem(locale.locale.ProjectReference, PROJECT_ROUTE),
        ]),
        getItem(locale.locale.AdminPanel, 'sub2', <AppstoreOutlined />, [
            getItem(locale.locale.RoleReference, ROLE_ROUTE),
            getItem(locale.locale.PersonProjectsReference, PERSON_PROJECTS_ROUTE),
            getItem(locale.locale.UserProjectsReference, '/'),
        ]),
    ];

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
});

export default LayoutBar;