import React, {useContext, useEffect, useState} from 'react';
import {Form, Input, Modal} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {Context} from "../../index";
import {createPerson, getPerson, getPersonList, updatePerson} from "../../http/personApi";

const PersonModal = ({modalType, open, onCancel, personId}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [gradeName, setGradeName] = useState('');
    const [selectedGrade, setSelectedGrade] = useState(null);
    const {person} = useContext(Context);

    useEffect(() => {
        setConfirmLoading(true);
        if(personId != null)
        {

            getPerson(personId).then(grade => {
                setGradeName(grade.gradeName);
                setSelectedGrade(grade)
            });
        }
        setConfirmLoading(false);
    }, [personId]);

    const handleOk = () => {
        setConfirmLoading(true);
        if(modalType === ADD_MODAL)
        {
            createPerson(gradeName).then(() =>{
                getPersonList().then(data => {
                    person.setPersons(data);
                });
                setSelectedGrade(null);
                setGradeName('');
                onCancel();
            });
        }
        else if(modalType === EDIT_MODAL)
        {
            updatePerson(selectedGrade.gradeId, gradeName).then(() =>{
                getPersonList().then(data => {
                    person.setPersons(data);
                });
                setSelectedGrade(null);
                setGradeName('');
                onCancel();
            });
        }
        setConfirmLoading(false);
    };

    return (
        <Modal
            title={modalType === ADD_MODAL ? 'Add person' : 'Edit grade'}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
        >
            <Form>
                <Form.Item label={'Grade name'}>
                    <Input value={gradeName} onChange={e => {setGradeName(e.target.value)
                        console.log(gradeName)
                    }}></Input>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PersonModal;