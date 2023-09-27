import React, {useContext, useEffect, useState} from 'react';
import {Alert, Form, Input, Modal} from 'antd';
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {createGrade, getGrade, updateGrade} from "../../http/gradeApi";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {unauthRedirect} from "../../utils/unauthRedirect";



const GradeModal = observer(({modalType, open, onCancel, gradeId}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [gradeName, setGradeName] = useState('');
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [gradeNameError, setGradeNameError] = useState(null);
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
                .catch(e => unauthRedirect(e));
        }
        setConfirmLoading(false);
    }, [gradeId]);

    const handleOk = () => {
        if(gradeName == null || gradeName === "")
        {
            setGradeNameError(locale.locale.Grade.NameValidationError);
            return;
        }
        if(modalType === ADD_MODAL)
        {
            createGrade(gradeName)
                .then(newGrade =>{
                    grade.setGrades([...grade.grades, newGrade])
                })
                .catch(e => unauthRedirect(e));
        }
        else if(modalType === EDIT_MODAL)
        {
            updateGrade(selectedGrade.gradeId, gradeName)
                .then((updatedGrade) =>{
                    grade.setGrades(grade.grades.map((item) => item.gradeId === updateGrade.gradeId ? {...updateGrade} : item))
                })
                .catch(e => unauthRedirect(e));
        }
        setSelectedGrade(null);
        setGradeName('');
        setGradeNameError(null);
        onCancel();
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
            <Form>
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