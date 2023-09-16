import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Form, Modal, Popconfirm, Space, Table} from "antd";
import {Context} from "../../index";
import Column from "antd/es/table/Column";
import ProjectSelector from "../ReferenceSelectors/ProjectSelector";
import {addProjectToPerson, deleteProjectToPerson} from "../../http/projectApi";

const PersonProjectsModal = ({open, onCancel, person}) => {
    const {project, locale} = useContext(Context);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedProjectName, setSelectedProjectName] = useState('');
    const [projects, setProjects] = useState(person.projects)

    const selectProjectTypeHandler = (projectId) => {
        project.projects.map(item => {
            if(item.projectTeamId === projectId)
            {
                setSelectedProjectName(item.projectTeamName);
                setSelectedProjectId(item.projectTeamId)
            }
        })
    }

    const handleOk = () => {
        let notExistsBit = true;
        projects.map(project => {
            if(project.projectTeamId === selectedProjectId)
                notExistsBit = false;
        })
        if(notExistsBit)
        {
            let formData = {
                "personId": person.personId,
                "projectId": selectedProjectId,
            }

            addProjectToPerson(formData)
                .then(() => setProjects([...projects, {
                    projectTeamId: selectedProjectId,
                    personId: person.personId,
                    projectTeamName: selectedProjectName
                }]))
                .catch();
        }

        setSelectedProjectId(null);
        setSelectedProjectName(null);
    };

    return (
        <Modal
            title={locale.locale.Project.Add}
            open={open}
            onOk={onCancel}
            onCancel={onCancel}
        >
            <Table dataSource={projects} rowKey={(record) => record.projectTeamId } style={{marginTop:20}}>
                <Column title={locale.locale.Project.ProjectName} dataIndex="projectTeamName" key="1" />
                <Column
                    title={locale.locale.Action}
                    key="2"
                    render={(record) => (
                        <Space size="middle">
                            <Popconfirm
                                title={locale.locale.Project.DeleteTitle}
                                description={locale.locale.Project.DeleteConfirmation}
                                onConfirm={() => {
                                    console.log(person.personId)
                                    console.log(record)
                                    console.log(projects)
                                    deleteProjectToPerson({
                                            "personId": person.personId,
                                            "projectId": record.projectTeamId,
                                        })
                                        .then(() => {
                                            let items = [];
                                            projects.map(project => {
                                                console.log(projects.projectTeamId)
                                                console.log(record.projectTeamId)
                                                if(project.projectTeamId !== record.projectTeamId)
                                                    items.push(project)
                                            })
                                            console.log('items', items)
                                            setProjects(items);
                                        });
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
            <p/>
            <Form>
                <ProjectSelector
                    onSelect={selectProjectTypeHandler}
                    selectedProjectName={selectedProjectName}
                />
                <Button
                    type={"primary"}
                    onClick={handleOk}
                >
                    {locale.locale.PersonProject.Add}
                </Button>
            </Form>
        </Modal>
    );
};

export default observer(PersonProjectsModal);