import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {getRoleList} from "../../http/roleApi";
import {Button, Dropdown, Form, Space, Spin} from "antd";

const RoleSelector = ({onSelect, selectedRoleName}) => {
    const {role, locale} = useContext(Context);
    const [roleLoaded, setRoleLoaded] = useState(false);
    const [roleDropdownItems,setRoleDropdownItems] = useState([]);

    useEffect(() => {
        getRoleList()
            .then(data => {
                role.setRoles(data);
            })
            .catch(e => {
                unauthRedirect(e);
            })
            .finally(() => {
                const items = [];
                role.roles.map((role) => {
                    items.push({
                        label: (
                            <div onClick={() => onSelect(role.roleId)}>
                                {role.roleName}
                            </div>
                        ),
                        key: role.roleId
                    });
                });
                setRoleDropdownItems(items);
                setRoleLoaded(true);
            });
    }, []);

    return (
        <Spin tip={locale.locale.Loading} spinning={!gradeLoaded}>
            <Form.Item label={locale.locale.GradeSelector.Grade}>
                <Dropdown menu={{
                    items: roleDropdownItems
                }}>
                    <Button>
                        <Space>
                            {selectedRoleName || locale.locale.RoleSelector.SelectRoleQuery}
                        </Space>
                    </Button>
                </Dropdown>
            </Form.Item>
        </Spin>
    );
};

export default observer(RoleSelector);