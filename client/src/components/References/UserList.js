import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {deleteRole, getRoleList} from "../../http/roleApi";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {getUserList} from "../../http/userApi";
import {Popconfirm, Space, Spin, Table} from "antd";
import Column from "antd/es/table/Column";
import {EDIT_MODAL} from "../../utils/consts";
import RoleModal from "../modals/RoleModal";
import UserModal from "../modals/UserModal";

const UserList = () => {
    const {locale} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([])
    const [needUpdate, setNeedUpdate] = useState(true);

    useEffect(() => {
        getUserList()
            .then(data => {

                let users = [];
                data.map(user => users.push({
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                    roleName: user.role.roleName,
                    roleId: user.roleId,
                }))
                setUsers(users);
            })
            .catch(e => {
                unauthRedirect(e);
            })
            .finally(() => setIsLoading(false));
    }, [needUpdate])

    return (
        <div>
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                <Table dataSource={users} rowKey={(record) => record.id } style={{marginTop:20}}>
                    <Column title={locale.locale.Role.RoleName} dataIndex="userName" key="1" />
                    <Column title={locale.locale.Role.RoleName} dataIndex="email" key="2" />
                    <Column title={locale.locale.Role.RoleName} dataIndex="roleName" key="3" />
                    <Column
                        title={locale.locale.Action}
                        key="4"
                        render={(record) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    setModalType(EDIT_MODAL);
                                    setIsLoading(true);
                                    setModalVisible(true);
                                    setSelectedUserId(record.roleId);
                                }}>
                                    {locale.locale.Edit}
                                </a>
                                <Popconfirm
                                    title={locale.locale.Role.DeleteTitle}
                                    description={locale.locale.Role.DeleteConfirmation}
                                    onConfirm={() => {
                                        // setIsLoading(true);
                                        // deleteRole(record.roleId)
                                        //     .then(() => {
                                        //         getRoleList()
                                        //             .then(data => {
                                        //                 role.setRoles(data);
                                        //                 setNeedUpdate(!needUpdate);
                                        //             })
                                        //             .catch(e => unauthRedirect(e))
                                        //             .finally(() => setIsLoading(false));
                                        //     })
                                        //     .catch(e => unauthRedirect(e))
                                    }}
                                    okText={locale.locale.Ok}
                                    cancelText={locale.locale.NO}
                                >
                                    <a>
                                        {locale.locale.Delete}
                                    </a>
                                </Popconfirm>
                            </Space>
                        )}
                    />
                </Table>
            </Spin>
            {modalVisible &&
                <UserModal
                    modalType={modalType}
                    open={modalVisible}
                    onCancel={() => {
                        setNeedUpdate(!needUpdate);
                        setIsLoading(false);
                        setModalVisible(false);
                    }}
                    roleId={modalVisible ? selectedUserId : null}
                />
            }
        </div>
    );
};

export default observer(UserList);