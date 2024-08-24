import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {getPersonList} from "../../../http/personApi";
import {createMeeting, getMeeting, updateMeeting} from "../../../http/meetingApi";
import dayjs from "dayjs";
import dateTimeConverter from "../../../utils/dateTimeConverter";
import {ADD_MODAL, EDIT_MODAL} from "../../../utils/consts";
import useHttpErrorHandling from "../../../hooks/useHttpErrorHandling";

const useMeetingModal = ({modalType,open,onCancel,meetingId}) => {
    const {
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        executeErrorHandlers,
        clearBackendErrors,
    } = useHttpErrorHandling();

    const {meeting, locale, person} = useContext(Context);
    const [plannedDate, setPlannedDate] = useState(null);
    const [actualDate, setActualDate] = useState(null);
    const [selectedPersonId, setSelectedPersonId] = useState(null);
    const [selectedPersonFullName, setSelectedPersonFullName] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [followUpIsSended, setFollowUpIsSended] = useState(false);
    const [personError, setPersonError] = useState(null);
    const [planedDateError, setPlanedDateError] = useState(null);
    const formatDate = 'YYYY-MM-DD';

    useEffect(() => {
        setConfirmLoading(true);
        const items = [];
        getPersonList()
            .then(persons => {
                person.setPersons(persons)
                persons.map((person) => items.push({
                        label: (
                            <div onClick={() => selectedPersonHandler(person.personId)}>
                                {person.lastName + ' ' + person.firstName + ' ' + person.surName}
                            </div>
                        ),
                        key: person.personId,
                    })
                )})
            .catch(e => executeErrorHandlers(e));
        if(meetingId != null)
        {
            getMeeting(meetingId)
                .then(data => {
                    if(data.meetingDate != null)
                        setActualDate(dayjs(dateTimeConverter.dateBackEndToDatePicker(data.meetingDate), formatDate));
                    else
                        setActualDate(null);
                    setPlannedDate(dayjs(dateTimeConverter.dateBackEndToDatePicker(data.meetingPlanDate), formatDate));
                    setSelectedPersonId(data.personId);
                    setSelectedPersonFullName(()=> {
                        person.persons.map(person => person.personId === data.personId
                            ? setSelectedPersonFullName(person.lastName + ' ' + person.firstName + ' ' + person.surName)
                            : locale.locale.Meeting.SelectPerson)
                    });
                    setFollowUpIsSended(data.followUpIsSended);
                })
                .catch(e => executeErrorHandlers(e));
        }
        setConfirmLoading(false);
    }, [modalType, meetingId]);

    const successfullyRequestHandler = () => {
        setSelectedPersonId(null);
        setSelectedPersonFullName(null);
        setPlannedDate(null);
        setActualDate(null);
        clearBackendErrors();
        onCancel();
    }
    const clearErrors = () => {
        setPlanedDateError(null);
        setPersonError(null);
        clearBackendErrors();
    }

    const selectedPersonHandler = (personId) => {
        person.persons.map(item => {
            if(item.personId === personId)
            {
                setSelectedPersonFullName(item.lastName + ' ' + item.firstName + ' ' + item.surName);
                setSelectedPersonId(item.personId)
            }
        })
    }
    const handleOk = () => {
        if(httpNotFoundRequestResponseError !== null)
        {
            return;
        }
        clearErrors();
        if(plannedDate == null || selectedPersonId == null)
        {
            if(plannedDate == null)
                setPlanedDateError(locale.locale.Meeting.PlanDateValidationError);

            if(selectedPersonId == null)
                setPersonError(locale.locale.Meeting.PersonValidationError);

            return;
        }
        let formData = {
            "meetingPlanDate": dateTimeConverter.datePickerToDate(plannedDate),
            "meetingDate": actualDate != null ? dateTimeConverter.datePickerToDate(actualDate) : null,
            "personId": selectedPersonId,
            "followUpIsSended": followUpIsSended,
        }
        if(modalType === ADD_MODAL)
        {
            createMeeting(formData)
                .then((newMeeting) =>{
                    meeting.setMeetings([...meeting.meetings, newMeeting])
                    successfullyRequestHandler();
                })
                .catch(e => executeErrorHandlers(e));
        }
        else if(modalType === EDIT_MODAL)
        {
            formData = {...formData, "meetingId": meetingId};
            updateMeeting(formData)
                .then((updatedMeeting) =>{
                    meeting.setMeetings(meeting.meetings.map((item) => item.meetingId === meetingId ? {...updatedMeeting} : item))
                    successfullyRequestHandler();
                })
                .catch(e => executeErrorHandlers(e));
        }
    };

    return {
        locale,
        handleOk,
        confirmLoading,
        setSelectedPersonId,
        setSelectedPersonFullName,
        selectedPersonFullName,
        httpNotFoundRequestResponseError,
        httpBadRequestResponseError,
        planedDateError,
        setPlannedDate,
        plannedDate,
        actualDate,
        setActualDate,
        personError,
        setPersonError,
        selectedPersonHandler,
        setFollowUpIsSended,
        followUpIsSended
    };
};

export default useMeetingModal;