import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Button, Dropdown, Form, Space, Spin} from "antd";
import {getProjectList} from "../../http/projectApi";
import {unauthRedirect} from "../../utils/unauthRedirect";

const ProjectSelector = ({onSelect, selectedProjectName}) => {
    const {project, locale} = useContext(Context);
    const [projectLoaded, setProjectLoaded] = useState(false);
    const [projectDropdownItems,setProjectDropdownItems] = useState([]);

    useEffect(() => {
        getProjectList()
            .then(data => {
                project.setProjects(data)
            })
            .catch(e => {
                unauthRedirect(e);
            })
            .finally(() => {
                const items = [];
                project.projects.map((project) => {
                    items.push({
                        label: (
                            <div onClick={() => onSelect(project.projectTeamId)}>
                                {project.projectTeamName}
                            </div>
                        ),
                        key: project.projectTeamId
                    });
                });
                setProjectDropdownItems(items);
                setProjectLoaded(true);
            });
    }, []);

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