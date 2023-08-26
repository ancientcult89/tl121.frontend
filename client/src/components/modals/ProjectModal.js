import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Form, Input, Modal} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {Context} from "../../index";
import {createProject, getProject, updateProject} from "../../http/projectApi";

const ProjectModal = observer(({modalType, open, onCancel, projectId}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const {project, locale} = useContext(Context);

    useEffect(() => {
        setConfirmLoading(true);
        if(projectId != null)
        {
            getProject(projectId).then(project => {
                setProjectName(project.projectTeamName);
                setSelectedProject(project)
            });
        }
        setConfirmLoading(false);
    }, [projectId]);

    const handleOk = () => {
        if(modalType === ADD_MODAL)
        {
            createProject(projectName).then(newProject =>{
                project.setProjects([...project.projects, newProject])
                setSelectedProject(null);
                setProjectName('');
                onCancel();
            });
        }
        else if(modalType === EDIT_MODAL)
        {
            updateProject(selectedProject.projectTeamId, projectName).then((updatedProject) =>{
                project.setProjects(project.projects.map((item) => item.projectTeamId === updatedProject.projectTeamId ? {...updatedProject} : item))
                setSelectedProject(null);
                setProjectName('');
                onCancel();
            });
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
            <Form>
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