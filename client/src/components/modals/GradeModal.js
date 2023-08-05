import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal} from 'antd';
import {ADD_MODAL} from "../../utils/consts";
import {getGrade} from "../../http/gradeApi";



const GradeModal = ({modalType, open, onCancel, gradeId}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [gradeName, setGradeName] = useState('');

    useEffect(() => {
        if(gradeId != null)
        {
            getGrade(gradeId).then(data => setGradeName(data.gradeName))
        }
    }, [gradeId]);

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {

            setConfirmLoading(false);
        }, 2000);
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
                    <Input value={gradeName} onChange={e => setGradeName(e.target.value)}></Input>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default GradeModal;