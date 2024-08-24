import {observer} from "mobx-react-lite";
import {Button, Dropdown, Form, Space, Spin} from "antd";
import useRoleSelector from "./useRoleSelector";

const RoleSelector = ({onSelect, selectedRoleName}) => {
    const {
        locale,
        roleLoaded,
        roleDropdownItems,
    } = useRoleSelector(onSelect);

    return (
        <Spin tip={locale.locale.Loading} spinning={!roleLoaded}>
            <Dropdown menu={{
                items: roleDropdownItems
            }}>
                <Button>
                    <Space>
                        {selectedRoleName || locale.locale.RoleSelector.SelectRoleQuery}
                    </Space>
                </Button>
            </Dropdown>
        </Spin>
    );
};

export default observer(RoleSelector);