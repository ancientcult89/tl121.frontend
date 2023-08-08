import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Input, Modal, Space, Spin} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {Context} from "../../index";
import {createPerson, getPerson, getPersonList, updatePerson} from "../../http/personApi";
import {getGradeList} from "../../http/gradeApi";

const PersonModal = ({modalType, open, onCancel, personId}) => {
    const {grade} = useContext(Context)
    const {person} = useContext(Context);
    const [personDataLoaded, setPersonDataLoaded] = useState(false);
    const [gradeTypesLoaded, setGradeTypesLoaded] = useState(false);
    const [selectedGradeName, setSelectedGradeName] = useState('');
    const [gradeDropdownItems,setGradeDropdownItems] = useState([]);

    const [firstName, setFirstName] = useState('');
    const [surName, setSurName] = useState('');
    const [lastName, setLastName] = useState('');
    const [shortName, setShortName] = useState('');
    const [selectedGradeId, setSelectedGradeId] = useState(null);
    const [personEmail, setPersonEmail ] = useState('')

    const selectGradeTypeHandler = (gradeId) => {
        grade.grades.map(item => {
            if(item.gradeId === gradeId)
            {
                setSelectedGradeName(item.gradeName);
                setSelectedGradeId(item.gradeId)
            }
        })
    }

    const items = [];

    useEffect(() => {
        if(personId != null)
        {
            getPerson(personId).then(grade => {
                setSelectedGradeName(grade.gradeName);
                setSelectedGradeId(grade.gradeId)
            });
        }
        setPersonDataLoaded(true);
        if(!grade)
        {
            getGradeList().then(data => {
                grade.setGrades(data);
            });
        }

        const items = [];
        grade.grades.map((grade) => {
            items.push({
                label: (
                    <div onClick={() => selectGradeTypeHandler(grade.gradeId)}>
                        {grade.gradeName}
                    </div>
                ),
                key: grade.gradeId
            });
        });
        setGradeDropdownItems(items);
        setGradeTypesLoaded(true);
        console.log('loaded = true')
    }, []);

    const handleOk = () => {
        if(modalType === ADD_MODAL)
        {
            const formData = {
                "firstName": firstName,
                "surName": surName,
                "lastName": lastName,
                "shortName": shortName,
                "email": personEmail,
                "gradeId": selectedGradeId,
            }

            createPerson(formData).then(() =>{
                getPersonList()
                    .then(data => {
                    person.setPersons(data);
                })
                    .catch()
                    .finally(() => {
                        setSelectedGradeId(null);
                        setSelectedGradeName(null);
                        setPersonEmail('');
                        setFirstName(null);
                        setShortName(null);
                        setLastName(null)
                        setSurName(null)
                        onCancel();
                    }
                );
            });
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
    };

    return (
        <Modal
            title={modalType === ADD_MODAL ? 'Add person' : 'Edit grade'}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
        >
            <Form>
                <Spin tip={"Loading..."} spinning={!personDataLoaded}>
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
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input value={personEmail} onChange={e => setPersonEmail(e.target.value)}/>
                    </Form.Item>
                </Spin>
                <Spin tip={"Loading..."} spinning={!gradeTypesLoaded}>
                    <Form.Item label={'Grade'}>
                        <Dropdown menu={{
                            items: gradeDropdownItems
                        }}>
                            <Button>
                                <Space>
                                    {selectedGradeName || 'Select a grade...'}
                                </Space>
                            </Button>
                        </Dropdown>
                    </Form.Item>
                </Spin>
            </Form>
        </Modal>
    );
};

export default PersonModal;