import {useContext, useState} from "react";
import {Context} from "../../../index";
import useHttpErrorHandling from "../../../hooks/useHttpErrorHandling";
import {
    addProjectToUser,
    deleteProjectToUser
} from "../../../http/projectApi";

const useUserProjectsModal = ({open, onCancel, user}) => {
    const {
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        executeErrorHandlers,
        clearBackendErrors,
    } = useHttpErrorHandling();

    const {project, locale} = useContext(Context);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedProjectName, setSelectedProjectName] = useState('');
    const [personNameError, setPersonNameError] = useState(null);
    const [errorType, setErrorType] = useState(null);
    const [projects, setProjects] = useState(user.projects);

    const selectProjectTypeHandler = (projectId) => {
        project.projects.map(item => {
            if(item.projectTeamId === projectId)
            {
                setSelectedProjectName(item.projectTeamName);
                setSelectedProjectId(item.projectTeamId)
            }
        })
    }

    function delPersonProject(userId, projectTeamId) {
        deleteProjectToUser({
            "userId": userId,
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
            .catch(e => executeErrorHandlers(e));
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
                .catch(e => executeErrorHandlers(e));
        }

        setSelectedProjectId(null);
        setSelectedProjectName(null);
        clearBackendErrors();
    };

    return {
        locale,
        handleOk,
        delPersonProject,
        projects,
        errorType,
        personNameError,
        selectedProjectName,
        selectProjectTypeHandler,
        httpNotFoundRequestResponseError,
        httpBadRequestResponseError,
    };
};

export default useUserProjectsModal;