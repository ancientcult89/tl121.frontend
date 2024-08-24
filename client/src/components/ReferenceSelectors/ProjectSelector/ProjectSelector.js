import {observer} from "mobx-react-lite";
import {Button, Dropdown, Space, Spin} from "antd";
import useProjectSelector from "./useProjectSelector";

const ProjectSelector = ({onSelect, selectedProjectName}) => {
    const {
        locale,
        projectLoaded,
        projectDropdownItems,
    } = useProjectSelector(onSelect);

    return (
        <div>
            <Spin tip={locale.locale.Loading} spinning={!projectLoaded}>
                <Dropdown menu={{
                    items: projectDropdownItems
                }}>
                    <Button>
                        <Space>
                            {selectedProjectName || locale.locale.ProjectSelector.SelectProjectQuery}
                        </Space>
                    </Button>
                </Dropdown>
            </Spin>
        </div>
    );
};

export default observer(ProjectSelector);