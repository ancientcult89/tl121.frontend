import {observer} from "mobx-react-lite";
import {Popconfirm, Space, Spin, Table} from "antd";
import Column from "antd/es/table/Column";
import {EDIT_MODAL} from "../../../utils/consts";
import UserModal from "../../modals/UserModal/UserModal";
import useUserList from "./useUserList";

const UserList = () => {
    const {
        locale,
        modalType,
        setModalType,
        modalVisible,
        setModalVisible,
        selectedUserId,
        setSelectedUserId,
        delUser,
        isLoading,
        setIsLoading,
        users,
        needUpdate,
        setNeedUpdate,
    } = useUserList();

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