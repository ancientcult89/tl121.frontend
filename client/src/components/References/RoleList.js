import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {deleteRole, getRoleList} from "../../http/roleApi";
import {Alert, Button, Popconfirm, Space, Spin, Table} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import RoleModal from "../modals/RoleModal";
import Column from "antd/es/table/Column";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {notFoundHttpRequestHandler} from "../../utils/notFoundHttpRequestHandler";

const RoleList = () => {
    const {locale, role} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [needUpdate, setNeedUpdate] = useState(true);
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);

    useEffect(() => {
        getRoles();
        setIsLoading(false);
    }, [needUpdate])

    function getRoles() {
        getRoleList()
            .then(data => role.setRoles(data))
            .catch(e => {
                unauthRedirect(e);
            })
    }

    function delRole(roleId) {
        setIsLoading(true);
        deleteRole(roleId)
            .then(() => getRoles())
            .catch(e => {
                unauthRedirect(e);
                setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
            })
            .finally(() => setIsLoading(false));
    }

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