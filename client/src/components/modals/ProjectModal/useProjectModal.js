
import useHttpErrorHandling from "../../../hooks/useHttpErrorHandling";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {createProject, getProject, updateProject} from "../../../http/projectApi";
import {ADD_MODAL, EDIT_MODAL} from "../../../utils/consts";

const useProjectModal = ({modalType, open, onCancel, projectId}) => {
    const {
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        executeErrorHandlers,
        clearBackendErrors,
    } = useHttpErrorHandling();

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectNameError, setProjectNameError] = useState(null)
    const {project, locale} = useContext(Context);

    useEffect(() => {
        setConfirmLoading(true);
        if(projectId != null)
        {
            getProject(projectId)
                .then(project => {
                    setProjectName(project.projectTeamName);
                    setSelectedProject(project)
                })
                .catch(e => executeErrorHandlers(e));
        }
        setConfirmLoading(false);
    }, [projectId]);

    const successfullyRequestHandler = () => {
        setSelectedProject(null);
        setProjectName('');
        clearBackendErrors();
        onCancel();
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

    return {
        locale,
        handleOk,
        confirmLoading,
        projectName,
        projectNameError,
        setProjectName,
    };
};

export default useProjectModal;