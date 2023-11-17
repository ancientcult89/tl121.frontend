import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Alert, Form, Input, Modal} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {Context} from "../../index";
import {createProject, getProject, updateProject} from "../../http/projectApi";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {badHttpRequestHandler} from "../../utils/badHttpRequestHandler";
import {notFoundHttpRequestHandler} from "../../utils/notFoundHttpRequestHandler";

const ProjectModal = observer(({modalType, open, onCancel, projectId}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectNameError, setProjectNameError] = useState(null)
    const {project, locale} = useContext(Context);
    const [httpBadRequestResponseError, setHttpBadRequestResponseError] = useState(null);
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);

    useEffect(() => {
        setConfirmLoading(true);
        if(projectId != null)
        {
            getProject(projectId)
                .then(project => {
                    setProjectName(project.projectTeamName);
                    setSelectedProject(project)
                })
                .catch(e => unauthRedirect(e));
        }
        setConfirmLoading(false);
    }, [projectId]);

    const successfullyRequestHandler = () => {
        setSelectedProject(null);
        setProjectName('');
        onCancel();
    }
    const clearErrors = () => {

        setHttpBadRequestResponseError(null);
    }

    const executeErrorHandlers = (e) => {
        unauthRedirect(e);
        setHttpBadRequestResponseError(badHttpRequestHandler(e));
        setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
    }

    const handleOk = () => {
        if(httpNotFoundRequestResponseError !== null)
        {
            return;
        }
        if(projectName == null || projectName === "")
        {
            setProjectNameError(locale.locale.Project.NameValidationError);
            return;
        }
        if(modalType === ADD_MODAL)
        {
            createProject(projectName)
                .then(newProject =>{
                    project.setProjects([...project.projects, newProject])
                    successfullyRequestHandler();
                })
                .catch(e => executeErrorHandlers(e));
        }
        else if(modalType === EDIT_MODAL)
        {
            updateProject(selectedProject.projectTeamId, projectName)
                .then((updatedProject) =>{
                    project.setProjects(project.projects.map((item) => item.projectTeamId === updatedProject.projectTeamId ? {...updatedProject} : item))
                    successfullyRequestHandler();
                })
                .catch(e => executeErrorHandlers(e));
        }
    };

    return (
        <Modal
            title={modalType === ADD_MODAL ? locale.locale.Person.Add : locale.locale.Person.Edit}
            open={open}
            destroyOnClose={true}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
        >
            {httpNotFoundRequestResponseError &&
                <div>
                    <Alert
                        message={httpNotFoundRequestResponseError}
                        type="error"
                        showIcon
                    />
                    <p></p>
                </div>
            }
            {httpBadRequestResponseError &&
                <div>
                    <Alert
                        message={httpBadRequestResponseError}
                        type="error"
                        showIcon
                    />
                    <p></p>
                </div>
            }
            {projectNameError &&
                <div>
                    <Alert
                        message={projectNameError}
                        type="error"
                        showIcon
                    />
                    <p></p>
                </div>
            }
            <Form
                labelCol={{ span: 5 }}
            >
                <Form.Item label={locale.locale.Project.ProjectName}>
                    <Input
                        value={projectName}
                        onChange={e => {setProjectName(e.target.value)}}
                    ></Input>
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default ProjectModal;