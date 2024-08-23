import React, {useContext, useState} from "react";
import {Context} from "../../../index";
import {deleteGrade, getGradeList} from "../../../http/gradeApi";


const useGradeSelector = (executeErrorHandlers, clearBackendErrors) => {
    const {grade, locale} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedGradeId, setSelectedGradeId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [needUpdate, setNeedUpdate] = useState(true);

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
        getGrades,
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
    };
};

export default useGradeSelector;