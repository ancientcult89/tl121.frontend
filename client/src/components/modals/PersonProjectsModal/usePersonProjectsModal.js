import React, {useContext, useState} from "react";
import {Context} from "../../../index";
import useHttpErrorHandling from "../../../hooks/useHttpErrorHandling";
import {addProjectToPerson, deleteProjectToPerson} from "../../../http/projectApi";

const usePersonProjectsModal = ({open, onCancel, person}) => {
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
    const [projects, setProjects] = useState(person.projects);

    const selectProjectTypeHandler = (projectId) => {
        project.projects.map(item => {
            if(item.projectTeamId === projectId)
            {
                setSelectedProjectName(item.projectTeamName);
                setSelectedProjectId(item.projectTeamId)
            }
        })
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

    return {
        locale,
        handleOk,
        httpNotFoundRequestResponseError,
        httpBadRequestResponseError,
        selectProjectTypeHandler,
        selectedProjectName,
        errorType,
        projects,
        delPersonProject,
        personNameError,
    };
};

export default usePersonProjectsModal;