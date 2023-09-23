import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Space, Spin, Table} from "antd";
import Column from "antd/es/table/Column";
import {Context} from "../index";
import {getUserProjects} from "../http/projectApi";
import UserProjectsModal from "../components/modals/UserProjectsModal";
import {getUserList} from "../http/userApi";
import {unauthRedirect} from "../utils/unauthRedirect";

const UserProjects = () => {
    const {locale} = useContext(Context);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [needUpdate, setNeedUpdate] = useState(true);
    const [items, setItems] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(  () => {
        getUserList()
            .then(async data => {
                console.log(data)
                let userProjectsTmp = [];
                await Promise.all(data.map(async user => {
                    await getUserProjects(user.id)
                        .then(projects => {
                            let tmp = {
                                userId: user.id,
                                userName: user.userName,
                                email: user.email,
                                projects: projects,
                                projectsAsString: projects.map(project => project.projectTeamName).join('; '),
                            }
                            userProjectsTmp.push(tmp);
                        })
                        .catch(e => {
                            unauthRedirect(e);
                        })
                }));
                setItems(userProjectsTmp);

            })
            .catch(e => {
                unauthRedirect(e);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [needUpdate])

    return (
        <div>
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                <Table dataSource={items} rowKey={(record) => record.userId } style={{marginTop: 20}}>
                    <Column title={locale.locale.UserProject.UserName} dataIndex="userName" key="userName"/>
                    <Column title={locale.locale.UserProject.Email} dataIndex="email" key="email"/>
                    <Column title={locale.locale.UserProject.Projects} dataIndex="projectsAsString" key="projectsAsString"/>
                    <Column
                        title={locale.locale.Action}
                        key="action"
                        render={(record) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    setSelectedUser(record);
                                    setIsLoading(true);
                                    setModalVisible(true);
                                }}>
                                    {locale.locale.Edit}
                                </a>
                            </Space>
                        )}
                    />
                </Table>
            </Spin>
            {modalVisible &&
                <UserProjectsModal
                    open={modalVisible}
                    onCancel={() => {
                        setNeedUpdate(!needUpdate);
                        setIsLoading(false);
                        setModalVisible(false);
                    }}
                    user={modalVisible ? selectedUser : null}
                />
            }
        </div>
    );
};

export default observer(UserProjects);