import {observer} from "mobx-react-lite";
import {Alert, Button, Popconfirm, Space, Spin, Table} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../../utils/consts";
import RoleModal from "../../modals/RoleModal/RoleModal";
import Column from "antd/es/table/Column";
import useRoleList from "./useRoleList";

const RoleList = () => {
    const {
        locale,
        setModalVisible,
        modalVisible,
        setSelectedRoleId,
        selectedRoleId,
        setIsLoading,
        isLoading,
        httpNotFoundRequestResponseError,
        setHttpNotFoundRequestResponseError,
        role,
        setModalType,
        modalType,
        needUpdate,
        setNeedUpdate,
        delRole,
    } = useRoleList();

    return (
        <div>
            <Button
                type={"primary"}
                onClick={() => {
                    setModalType(ADD_MODAL);
                    setModalVisible(true);
                    setIsLoading(true);
                    setSelectedRoleId(null);
                }}
            >
                {locale.locale.Role.Add}
            </Button>
            {httpNotFoundRequestResponseError &&
                <div style={{marginTop:5}}>
                    <Alert
                        message={httpNotFoundRequestResponseError}
                        type="error"
                        closable={true}
                        onClick={() => setHttpNotFoundRequestResponseError(null)}
                        showIcon
                    />
                    <p></p>
                </div>
            }
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                <Table dataSource={role.roles} rowKey={(record) => record.roleId } style={{marginTop:20}}>
                    <Column title={locale.locale.Role.RoleName} dataIndex="roleName" key="1" />
                    <Column
                        title={locale.locale.Action}
                        key="2"
                        render={(record) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    setModalType(EDIT_MODAL);
                                    setIsLoading(true);
                                    setModalVisible(true);
                                    setSelectedRoleId(record.roleId);
                                }}>
                                    {locale.locale.Edit}
                                </a>
                                <Popconfirm
                                    title={locale.locale.Role.DeleteTitle}
                                    description={locale.locale.Role.DeleteConfirmation}
                                    onConfirm={() => delRole(record.roleId)}
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
                <RoleModal
                    modalType={modalType}
                    open={modalVisible}
                    onCancel={() => {
                        setNeedUpdate(!needUpdate);
                        setIsLoading(false);
                        setModalVisible(false);
                    }}
                    roleId={modalVisible ? selectedRoleId : null}
                />
            }
        </div>
    );
};

export default observer(RoleList);