import React, {useContext, useEffect, useState} from 'react';
import {Form, Input, Modal} from 'antd';
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {createGrade, getGrade, getGradeList, updateGrade} from "../../http/gradeApi";
import {Context} from "../../index";



const GradeModal = ({modalType, open, onCancel, gradeId}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [gradeName, setGradeName] = useState('');
    const [selectedGrade, setSelectedGrade] = useState(null);
    const {grade} = useContext(Context);

    useEffect(() => {
        setConfirmLoading(true);
        if(gradeId != null)
        {
            getGrade(gradeId).then(grade => {
                setGradeName(grade.gradeName);
                setSelectedGrade(grade)
            });
        }
        setConfirmLoading(false);
    }, [gradeId]);

    const handleOk = () => {
        if(modalType === ADD_MODAL)
        {
            createGrade(gradeName).then(() =>{
                getGradeList().then(data => {
                    grade.setGrades(data);
                });
                setSelectedGrade(null);
                setGradeName('');
                onCancel();
            });
        }
        else if(modalType === EDIT_MODAL)
        {
            updateGrade(selectedGrade.gradeId, gradeName).then(() =>{
                getGradeList().then(data => {
                    grade.setGrades(data);
                });
                setSelectedGrade(null);
                setGradeName('');
                onCancel();
            });
        }
    };

    return (
        <Modal
            title={modalType === ADD_MODAL ? 'Add grade' : 'Edit grade'}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
        >
            <Form>
                <Form.Item label={'Grade name'}>
                    <Input
                        value={gradeName}
                        onChange={e => {setGradeName(e.target.value)}}
                    ></Input>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default GradeModal;