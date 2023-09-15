import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {deleteRole, getRoleList} from "../../http/roleApi";
import {Button, Popconfirm, Space, Spin, Table} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import RoleModal from "../modals/RoleModal";
import {deleteGrade, getGradeList} from "../../http/gradeApi";
import Column from "antd/es/table/Column";

const RoleList = () => {
    const {locale, role} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [needUpdate, setNeedUpdate] = useState(true);

    useEffect(() => {
        getRoleList()
            .then(data => role.setRoles(data))
            .catch()
            .finally(() => setIsLoading(false));
    }, [needUpdate])

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
                                    console.log(record.roleId);
                                    setSelectedRoleId(record.roleId);
                                }}>
                                    {locale.locale.Edit}
                                </a>
                                <Popconfirm
                                    title={locale.locale.Role.DeleteTitle}
                                    description={locale.locale.Role.DeleteConfirmation}
                                    onConfirm={() => {
                                        setIsLoading(true);
                                        deleteRole(record.roleId).then(() => {
                                            getRoleList().then(data => {
                                                role.setRoles(data);
                                                setNeedUpdate(!needUpdate);
                                            })
                                                .finally(() => setIsLoading(false));
                                        })
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
        </div>
    );
};

export default observer(RoleList);