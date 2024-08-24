import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {deleteUser, getUserList} from "../../http/userApi";
import {Popconfirm, Space, Spin, Table} from "antd";
import Column from "antd/es/table/Column";
import {EDIT_MODAL} from "../../utils/consts";
import UserModal from "../modals/UserModal/UserModal";

const UserList = () => {
    const {locale} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([])
    const [needUpdate, setNeedUpdate] = useState(true);

    useEffect(() => {
        getUsers();
    }, [needUpdate])

    function getUsers() {
        getUserList()
            .then(data => {
                setUsers(formUsers(data));
            })
            .catch(e => {
                unauthRedirect(e);
            })
            .finally(() => setIsLoading(false));
    }

    function formUsers(data) {
        let users = [];
        data.map(user => users.push({
            id: user.id,
            userName: user.userName,
            email: user.email,
            roleName: user.role?.roleName,
            roleId: user.roleId,
        }))
        return users;
    }

    function delUser(userId) {
        setIsLoading(true);
        deleteUser(userId)
            .then(() => getUsers())
            .catch(e => unauthRedirect(e))
            .finally(() => setIsLoading(false));
    }

    return (
        <div>
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                <Table dataSource={users} rowKey={(record) => record.id } style={{marginTop:20}}>
                    <Column title={locale.locale.User.UserName} dataIndex="userName" key="1" />
                    <Column title={locale.locale.User.Email} dataIndex="email" key="2" />
                    <Column title={locale.locale.User.Role} dataIndex="roleName" key="3" />
                    <Column
                        title={locale.locale.Action}
                        key="4"
                        render={(record) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    setModalType(EDIT_MODAL);
                                    setIsLoading(true);
                                    setSelectedUserId(record.id);
                                    setModalVisible(true);
                                }}>
                                    {locale.locale.Edit}
                                </a>
                                <Popconfirm
                                    title={locale.locale.User.DeleteTitle}
                                    description={locale.locale.User.DeleteConfirmation}
                                    onConfirm={() => delUser(record.id)}
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
                    userId={modalVisible ? selectedUserId : null}
                />
            }
        </div>
    );
};

export default observer(UserList);