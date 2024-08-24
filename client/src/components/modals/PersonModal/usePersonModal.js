import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {getGradeList} from "../../../http/gradeApi";
import {unauthRedirect} from "../../../utils/unauthRedirect";
import {createPerson, getPerson, updatePerson} from "../../../http/personApi";
import {emailValidator} from "../../../utils/emailValidator";
import {ADD_MODAL, EDIT_MODAL} from "../../../utils/consts";
import useHttpErrorHandling from "../../../hooks/useHttpErrorHandling";

const usePersonModal = ({modalType, open, onCancel, personId,}) => {
    const {
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        executeErrorHandlers,
        clearBackendErrors,
    } = useHttpErrorHandling();

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
                    executeErrorHandlers(e);
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

    const successfullyRequestHandler = () => {
        setSelectedGradeId(null);
        setSelectedGradeName(null);
        setPersonEmail('');
        setFirstName(null);
        setShortName(null);
        setLastName(null);
        setSurName(null);
        setGradeError(null);
        setEmailError(null);
        setNameError(null);
        onCancel();
    }
    const clearErrors = () => {
        clearBackendErrors();
        setGradeError(null);
        setEmailError(null);
        setNameError(null);
    }

    const handleOk = () => {
        if(httpNotFoundRequestResponseError !== null)
        {
            return;
        }
        clearErrors();
        let emailIsValid = emailValidator(personEmail);
        if(selectedGradeId == null || !emailIsValid || firstName == null || firstName === ''
            || lastName == null || lastName === '' || surName == null || surName === ''
            || shortName == null || shortName === '')
        {
            if(selectedGradeId == null)
                setGradeError(locale.locale.Person.GradeValidationError);

            if(!emailIsValid)
                setEmailError(locale.locale.Person.EmailValidationError);

            if(firstName == null || firstName === ''
                || lastName == null || lastName === '' || surName == null || surName === ''
                || shortName == null || shortName === '')
            {
                setNameError(locale.locale.Person.NameValidationError)
            }

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
                    successfullyRequestHandler();
                })
                .catch(e => {
                    executeErrorHandlers(e);
                });
        }
        else if(modalType === EDIT_MODAL)
        {
            formData = {...formData, "personId": personId};
            updatePerson(formData)
                .then((updatedPerson) =>{
                    person.setPersons(person.persons.map((item) => item.personId === personId ? {...updatedPerson} : item))
                    successfullyRequestHandler();
                })
                .catch(e => {
                    executeErrorHandlers(e);
                });
        }
    };

    return {
        locale,
        handleOk,
        personDataLoaded,
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        nameError,
        firstName,
        setFirstName,
        surName,
        setSurName,
        lastName,
        setLastName,
        emailError,
        personEmail,
        setPersonEmail,
        gradeError,
        selectGradeTypeHandler,
        selectedGradeName,
        shortName,
        setShortName,
    };
};

export default usePersonModal;