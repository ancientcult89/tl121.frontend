import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Alert, Button, Form, Modal, Popconfirm, Row, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import {addProjectToUser, deleteProjectToUser} from "../../http/projectApi";
import ProjectSelector from "../ReferenceSelectors/ProjectSelector";
import {Context} from "../../index";
import {unauthRedirect} from "../../utils/unauthRedirect";

const UserProjectsModal = ({open, onCancel, user}) => {
    const {project, locale} = useContext(Context);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedProjectName, setSelectedProjectName] = useState('');
    const [personNameError, setPersonNameError] = useState(null)
    const [errorType, setErrorType] = useState(null)
    const [projects, setProjects] = useState(user.projects)

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
        if(selectedProjectName == null || selectedProjectName === "")
        {
            setPersonNameError(locale.locale.UserProject.NameValidationError);
            setErrorType("error");
            return;
        }
        let notExistsBit = true;
        projects.map(project => {
            if(project.projectTeamId === selectedProjectId)
            {
                setPersonNameError(locale.locale.UserProject.AlreadyUsed);
                setErrorType("warning");
                notExistsBit = false;
                return;
            }
        })
        if(notExistsBit)
        {
            let formData = {
                "userId": user.userId,
                "projectId": selectedProjectId,
            }

            addProjectToUser(formData)
                .then(() => setProjects([...projects, {
                    projectTeamId: selectedProjectId,
                    userId: user.userId,
                    projectTeamName: selectedProjectName
                }]))
                .catch(e => unauthRedirect(e));
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
            <Form
                labelCol={{ span: 8 }}
            >
                <Row style={{marginTop:20}}>
                    <Button
                        type={"primary"}
                        onClick={handleOk}
                        style={{marginRight:5}}
                    >
                        {locale.locale.PersonProject.Add}
                    </Button>
                    <ProjectSelector
                        onSelect={selectProjectTypeHandler}
                        selectedProjectName={selectedProjectName}
                    />
                </Row>
            </Form>
            {personNameError &&
                <div>
                    <Alert
                        message={personNameError}
                        type={errorType}
                        showIcon
                    />
                    <p></p>
                </div>
            }
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
                                    deleteProjectToUser({
                                        "userId": user.userId,
                                        "projectId": record.projectTeamId,
                                    })
                                        .then(() => {
                                            let items = [];
                                            projects.map(project => {
                                                if(project.projectTeamId !== record.projectTeamId)
                                                    items.push(project)
                                            })
                                            setProjects(items);
                                        })
                                        .catch(e => unauthRedirect(e));
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
        </Modal>
    );
};

export default observer(UserProjectsModal);