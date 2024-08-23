import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Alert, Button, Form, Modal, Popconfirm, Row, Space, Table} from "antd";
import {Context} from "../../index";
import Column from "antd/es/table/Column";
import ProjectSelector from "../ReferenceSelectors/ProjectSelector";
import {addProjectToPerson, deleteProjectToPerson} from "../../http/projectApi";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {badHttpRequestHandler} from "../../utils/badHttpRequestHandler";
import {notFoundHttpRequestHandler} from "../../utils/notFoundHttpRequestHandler";
import BackEndErrorBox from "../Form/ErrorBox/BackEndErrorBox";

const PersonProjectsModal = ({open, onCancel, person}) => {
    const {project, locale} = useContext(Context);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedProjectName, setSelectedProjectName] = useState('');
    const [personNameError, setPersonNameError] = useState(null);
    const [errorType, setErrorType] = useState(null);
    const [projects, setProjects] = useState(person.projects);
    const [httpBadRequestResponseError, setHttpBadRequestResponseError] = useState(null);
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);

    const selectProjectTypeHandler = (projectId) => {
        project.projects.map(item => {
            if(item.projectTeamId === projectId)
            {
                setSelectedProjectName(item.projectTeamName);
                setSelectedProjectId(item.projectTeamId)
            }
        })
    }

    const executeErrorHandlers = (e) => {
        unauthRedirect(e);
        setHttpBadRequestResponseError(badHttpRequestHandler(e));
        setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
    }

    function delPersonProject(personId, projectTeamId) {
        deleteProjectToPerson({
            "personId": personId,
            "projectId": projectTeamId,
        })
            .then(() => {
                let items = [];
                projects.map(project => {
                    if(project.projectTeamId !== projectTeamId)
                        items.push(project)
                })
                setProjects(items);
            })
            .catch(e => {
                executeErrorHandlers(e);
            });
    }

    const handleOk = () => {
        if(selectedProjectName == null || selectedProjectName === "")
        {
            setPersonNameError(locale.locale.PersonProject.NameValidationError);
            setErrorType("error");
            return;
        }
        let notExistsBit = true;
        projects.map(project => {
            if(project.projectTeamId === selectedProjectId)
            {
                setPersonNameError(locale.locale.PersonProject.AlreadyUsed);
                setErrorType("warning");
                notExistsBit = false;
                return;
            }
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
                .catch(e => {
                    executeErrorHandlers(e);
                });
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
            <BackEndErrorBox
                httpBadRequestResponseError={httpBadRequestResponseError}
                httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
            />
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
            <Table dataSource={projects} rowKey={(record) => record.projectTeamId }>
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
                                    delPersonProject(person.personId, record.projectTeamId);
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

export default observer(PersonProjectsModal);