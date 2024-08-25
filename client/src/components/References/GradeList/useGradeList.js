import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {deleteGrade, getGradeList} from "../../../http/gradeApi";
import useHttpErrorHandling from "../../../hooks/useHttpErrorHandling";


const useGradeList = () => {
    const {grade, locale} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedGradeId, setSelectedGradeId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [needUpdate, setNeedUpdate] = useState(true);

    const {
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        clearBackendErrors,
        executeErrorHandlers,
        setHttpBadRequestResponseError,
        setHttpNotFoundRequestResponseError,
    } = useHttpErrorHandling();

    useEffect(() => {
        getGrades();
        setIsLoading(false);
    }, [needUpdate])

    function getGrades() {
        getGradeList()
            .then(data => grade.setGrades(data))
            .catch(e => {
                executeErrorHandlers(e);
            });
    }

    function delGrade(gradeId) {
        setIsLoading(true);
        deleteGrade(gradeId)
            .then(() => getGrades())
            .catch(e => {
                executeErrorHandlers(e);
            })
            .finally(() => {
                setIsLoading(false);
                clearBackendErrors();
            })
    }

    return {
        locale,
        delGrade,
        needUpdate,
        setIsLoading,
        setSelectedGradeId,
        setModalVisible,
        setModalType,
        modalVisible,
        modalType,
        selectedGradeId,
        isLoading,
        setNeedUpdate,
        grade,
        httpNotFoundRequestResponseError,
        httpBadRequestResponseError,
    };
};

export default useGradeList;