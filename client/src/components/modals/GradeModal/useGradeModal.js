import React, {useContext, useState} from "react";
import {Context} from "../../../index";
import {createGrade, getGrade, updateGrade} from "../../../http/gradeApi";
import {ADD_MODAL, EDIT_MODAL} from "../../../utils/consts";


const useGradeModal = (props) => {
    const {
        executeErrorHandlers,
        clearBackendErrors,
        onCancel,
        modalType,
        httpNotFoundRequestResponseError,
        gradeId,
    } = props;

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [gradeName, setGradeName] = useState('');
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [gradeNameError, setGradeNameError] = useState(null);
    const {grade, locale} = useContext(Context);
    const successfullyRequestHandler = () => {
        setSelectedGrade(null);
        setGradeName('');
        setGradeNameError(null);
        clearBackendErrors();
        onCancel();
    }
    const clearErrors = () => {
        setGradeNameError(null);
        clearBackendErrors();
    }

    const handleOk = () => {
        if(httpNotFoundRequestResponseError !== null)
        {
            return;
        }
        clearErrors();
        if(gradeName == null || gradeName === "")
        {
            setGradeNameError(locale.locale.Grade.NameValidationError);
            return;
        }
        else
        {
            setGradeNameError(null);
        }

        if(modalType === ADD_MODAL)
        {
            createGrade(gradeName)
                .then(newGrade =>{
                    grade.setGrades([...grade.grades, newGrade])
                    successfullyRequestHandler();
                })
                .catch(e => {
                    executeErrorHandlers(e);
                });
        }
        else if(modalType === EDIT_MODAL)
        {
            updateGrade(selectedGrade.gradeId, gradeName)
                .then((updatedGrade) =>{
                    grade.setGrades(grade.grades.map((item) => item.gradeId === updateGrade.gradeId ? {...updateGrade} : item))
                    successfullyRequestHandler();
                })
                .catch(e => {
                    executeErrorHandlers(e);
                });
        }
    };

    function getGradeData() {
        setConfirmLoading(true);
        if(gradeId != null)
        {
            getGrade(gradeId)
                .then(grade => {
                    setGradeName(grade.gradeName);
                    setSelectedGrade(grade)
                })
                .catch(e => {
                    executeErrorHandlers(e);
                });
        }
        setConfirmLoading(false);
    }

    return {
        locale,
        setConfirmLoading,
        setGradeName,
        setSelectedGrade,
        getGradeData,
        handleOk,
        confirmLoading,
        gradeNameError,
        gradeName,
    };
};

export default useGradeModal;