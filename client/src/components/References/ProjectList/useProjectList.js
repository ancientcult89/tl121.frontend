import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {notFoundHttpRequestHandler} from "../../../utils/notFoundHttpRequestHandler";
import {unauthRedirect} from "../../../utils/unauthRedirect";
import {archivePerson, deletePerson, getPersonList, sendGreetingMessage} from "../../../http/personApi";
import {badHttpRequestHandler} from "../../../utils/badHttpRequestHandler";
import useHttpErrorHandling from "../../../hooks/useHttpErrorHandling";
import {deleteProject, getProjectList} from "../../../http/projectApi";


const useProjectList = () => {
    const {project, locale} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [needUpdate, setNeedUpdate] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);

    useEffect(() => {
        getProjects();
        setIsLoading(false);
    }, [needUpdate])

    function getProjects() {
        getProjectList()
            .then(data => project.setProjects(data))
            .catch(e => {
                unauthRedirect(e);
            })
    }

    function delProject(projectId) {
        setIsLoading(true);
        deleteProject(projectId)
            .then(() => getProjects())
            .catch(e => {
                unauthRedirect(e);
                setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
            })
            .finally(() => setIsLoading(false));
    }

    return {
        locale,
        setModalType,
        modalType,
        setSelectedProjectId,
        setIsLoading,
        isLoading,
        httpNotFoundRequestResponseError,
        setHttpNotFoundRequestResponseError,
        project,
        setModalVisible,
        modalVisible,
        selectedProjectId,
        needUpdate,
        setNeedUpdate,
        delProject,
    };
};

export default useProjectList;