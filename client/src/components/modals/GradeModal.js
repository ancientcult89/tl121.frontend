import React, {useContext, useEffect, useState} from 'react';
import {Alert, Form, Input, Modal} from 'antd';
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {createGrade, getGrade, updateGrade} from "../../http/gradeApi";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {badHttpRequestHandler} from "../../utils/badHttpRequestHandler";
import {notFoundHttpRequestHandler} from "../../utils/notFoundHttpRequestHandler";



const GradeModal = observer(({modalType, open, onCancel, gradeId}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [gradeName, setGradeName] = useState('');
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [gradeNameError, setGradeNameError] = useState(null);
    const [httpBadRequestResponseError, setHttpBadRequestResponseError] = useState(null);
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);
    const {grade, locale} = useContext(Context);

    useEffect(() => {
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
    }, [gradeId]);

    const successfullyRequestHandler = () => {
        setSelectedGrade(null);
        setGradeName('');
        setGradeNameError(null);
        setHttpBadRequestResponseError(null);
        onCancel();
    }
    const clearErrors = () => {
        setGradeNameError(null);
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

    return (
        <Modal
            title={modalType === ADD_MODAL ? locale.locale.Grade.Add : locale.locale.Grade.Edit}
            open={open}
            destroyOnClose={true}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
        >
            <Form
                labelCol={{ span: 5 }}
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
                {gradeNameError &&
                    <div>
                        <Alert
                            message={gradeNameError}
                            type="error"
                            showIcon
                        />
                        <p></p>
                    </div>
                }
                <Form.Item
                    label={locale.locale.Grade.GradeName}
                >
                    <Input
                        value={gradeName}
                        onChange={e => {setGradeName(e.target.value)}}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default GradeModal;