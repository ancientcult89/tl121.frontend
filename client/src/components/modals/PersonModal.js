import React, {useContext, useEffect, useState} from 'react';
import {Alert, Form, Input, Modal, Space, Spin} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {Context} from "../../index";
import {createPerson, getPerson, updatePerson} from "../../http/personApi";
import {getGradeList} from "../../http/gradeApi";
import {observer} from "mobx-react-lite";
import GradeSelector from "../ReferenceSelectors/GradeSelector";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {emailValidator} from "../../utils/emailValidator";

const PersonModal = observer(({modalType, open, onCancel, personId}) => {
    const {grade, person, locale} = useContext(Context)
    const [personDataLoaded, setPersonDataLoaded] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [surName, setSurName] = useState('');
    const [lastName, setLastName] = useState('');
    const [shortName, setShortName] = useState('');
    const [selectedGradeId, setSelectedGradeId] = useState(null);
    const [selectedGradeName, setSelectedGradeName] = useState('');
    const [personEmail, setPersonEmail ] = useState('')
    const [emailError, setEmailError] = useState(null);
    const [gradeError, setGradeError] = useState(null);
    const [nameError, setNameError] = useState(null);

    const selectGradeTypeHandler = (gradeId) => {
        grade.grades.map(item => {
            if(item.gradeId === gradeId)
            {
                setSelectedGradeName(item.gradeName);
                setSelectedGradeId(item.gradeId)
            }
        })
    }

    useEffect(() => {
        getGradeList()
            .then(data => {
            grade.setGrades(data);
            })
            .catch(e => {
                unauthRedirect(e);
            });

        if(personId != null)
        {
            getPerson(personId)
                .then(person => {
                    grade.grades.map(item => {
                        if(item.gradeId === person.gradeId)
                        {
                            setSelectedGradeName(item.gradeName);
                            setSelectedGradeId(item.gradeId)
                        }
                    });
                    setFirstName(person.firstName);
                    setLastName(person.lastName);
                    setSurName(person.surName);
                    setShortName(person.shortName);
                    setPersonEmail(person.email);
                })
                .catch(e => {
                    unauthRedirect(e);
                });
        }
        setPersonDataLoaded(true);

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
    }, [modalType]);

    const handleOk = () => {
        let emailIsValid = emailValidator(personEmail);
        if(selectedGradeId == null || !emailIsValid || firstName == null || firstName === ''
            || lastName == null || lastName == '' || surName == null || surName === ''
            || shortName == null || shortName === '')
        {
            if(selectedGradeId == null)
                setGradeError(locale.locale.Person.GradeValidationError);
            else
                setGradeError(null);
            if(!emailIsValid)
                setEmailError(locale.locale.Person.EmailValidationError);
            else
                setEmailError(null);
            if(firstName == null || firstName === ''
                || lastName == null || lastName == '' || surName == null || surName === ''
                || shortName == null || shortName === '')
            {
                setNameError(locale.locale.Person.NameValidationError)
            }
            else
                setNameError(null)
            return;
        }

        let formData = {
            "firstName": firstName,
            "surName": surName,
            "lastName": lastName,
            "shortName": shortName,
            "email": personEmail,
            "gradeId": selectedGradeId,
        }

        if(modalType === ADD_MODAL)
        {
            createPerson(formData)
                .then((newPerson) =>{
                    person.setPersons([...person.persons, newPerson])
                    setSelectedGradeId(null);
                    setSelectedGradeName(null);
                    setPersonEmail('');
                    setFirstName(null);
                    setShortName(null);
                    setLastName(null)
                    setSurName(null)
                    onCancel();
                })
                .catch(e => unauthRedirect(e));
        }
        else if(modalType === EDIT_MODAL)
        {
            formData = {...formData, "personId": personId};
            updatePerson(formData)
                .then((updatedPerson) =>{
                    person.setPersons(person.persons.map((item) => item.personId === personId ? {...updatedPerson} : item))
                    setSelectedGradeId(null);
                    setSelectedGradeName(null);
                    setPersonEmail('');
                    setFirstName(null);
                    setShortName(null);
                    setLastName(null)
                    setSurName(null)
                    onCancel();
                })
                .catch(e => unauthRedirect(e));
        }
    };

    return (
        <Modal
            title={modalType === ADD_MODAL ? locale.locale.Person.Add : locale.locale.Person.Edit}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
        >
            <Form>
                <Spin tip={locale.locale.Loading} spinning={!personDataLoaded}>
                    {nameError &&
                        <div>
                            <Alert
                                message={nameError}
                                type="error"
                                showIcon
                            />
                            <p></p>
                        </div>
                    }
                    <Form.Item label={locale.locale.Person.FirstName}>
                        <Input value={firstName} onChange={e => {setFirstName(e.target.value)

                        }}></Input>
                    </Form.Item>
                    <Form.Item label={locale.locale.Person.SurName}>
                        <Input value={surName} onChange={e => {setSurName(e.target.value)

                        }}></Input>
                    </Form.Item>
                    <Form.Item label={locale.locale.Person.LastName}>
                        <Input value={lastName} onChange={e => {setLastName(e.target.value)

                        }}></Input>
                    </Form.Item>
                    <Form.Item label={locale.locale.Person.ShortName}>
                        <Input value={shortName} onChange={e => {setShortName(e.target.value)

                        }}></Input>
                    </Form.Item>
                    {emailError &&
                        <div>
                            <Alert
                                message={emailError}
                                type="error"
                                showIcon
                            />
                            <p></p>
                        </div>
                    }
                    <Form.Item
                        label={locale.locale.Person.Email}
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input value={personEmail} onChange={e => setPersonEmail(e.target.value)}/>
                    </Form.Item>
                </Spin>
                {gradeError &&
                    <div>
                        <Alert
                            message={gradeError}
                            type="error"
                            showIcon
                        />
                        <p></p>
                    </div>
                }
                <GradeSelector
                    onSelect={selectGradeTypeHandler}
                    selectedGradeName={selectedGradeName}
                />
            </Form>
        </Modal>
    );
});

export default PersonModal;