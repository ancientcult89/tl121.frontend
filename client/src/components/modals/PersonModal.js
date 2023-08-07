import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Input, Modal, Space} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {Context} from "../../index";
import {createPerson, getPerson, getPersonList, updatePerson} from "../../http/personApi";
import {getGradeList} from "../../http/gradeApi";

const PersonModal = ({modalType, open, onCancel, personId}) => {
    const {grade} = useContext(Context)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedGradeName, setSelectedGradeName] = useState('');
    const [gradeDropdownItems,setGradeDropdownItems] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const {person} = useContext(Context);
    const [firstName, setFirstName] = useState('');
    const [surName, setSurName] = useState('');
    const [lastName, setLastName] = useState('');
    const [shortName, setShortName] = useState('');

    const handleGradeMenuClick = (e) => {
        setSelectedGrade(e.key);
        grade.grades.map(item => {
            console.log('item key ' +  item.gradeId)
            console.log('e key ' +  e.key)
            if(item.gradeId === e.key)
                setSelectedGradeName(item.gradeName);
        })

    };

    const items = [];

    useEffect(() => {
        setConfirmLoading(true);
        if(personId != null)
        {

            getPerson(personId).then(grade => {
                setSelectedGradeName(grade.gradeName);
                setSelectedGrade(grade)
            });
        }
        getGradeList().then(data => {
            console.log(data);
            grade.setGrades(data);
        });
        const items = [];
        grade.grades.map((grade) => {
            console.log(grade.gradeName);
            items.push({
                label: grade.gradeName,
                key: grade.gradeId
            });
        });
        setGradeDropdownItems(items);
        console.log('grade ' + gradeDropdownItems.length);
        setConfirmLoading(false);
    }, [personId, grade]);

    const handleOk = () => {
        setConfirmLoading(true);
        if(modalType === ADD_MODAL)
        {

            // createPerson(gradeName).then(() =>{
            //     getPersonList().then(data => {
            //         person.setPersons(data);
            //     });
            //     setSelectedGrade(null);
            //     setGradeName('');
            //     onCancel();
            // });
        }
        else if(modalType === EDIT_MODAL)
        {
            // updatePerson(selectedGrade.gradeId, gradeName).then(() =>{
            //     getPersonList().then(data => {
            //         person.setPersons(data);
            //     });
            //     setSelectedGrade(null);
            //     setGradeName('');
            //     onCancel();
            // });
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
                <Form.Item label={'FirstName'}>
                    <Input value={firstName} onChange={e => {setFirstName(e.target.value)

                    }}></Input>
                </Form.Item>
                <Form.Item label={'SurName'}>
                    <Input value={surName} onChange={e => {setSurName(e.target.value)

                    }}></Input>
                </Form.Item>
                <Form.Item label={'LastName'}>
                    <Input value={lastName} onChange={e => {setLastName(e.target.value)

                    }}></Input>
                </Form.Item>
                <Form.Item label={'ShortName'}>
                    <Input value={shortName} onChange={e => {setShortName(e.target.value)

                    }}></Input>
                </Form.Item>
                <Dropdown menu={{
                    items: gradeDropdownItems,
                    onClick: handleGradeMenuClick
                }}>
                    <Button>
                        <Space>
                            {selectedGradeName || 'Select a grade...'}
                        </Space>
                    </Button>
                </Dropdown>
            </Form>
        </Modal>
    );
};

export default PersonModal;