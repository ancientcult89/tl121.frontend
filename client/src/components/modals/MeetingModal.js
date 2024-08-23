import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Alert, Checkbox, DatePicker, Form, Modal} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {Context} from "../../index";
import {createMeeting, getMeeting, updateMeeting} from "../../http/meetingApi";
import dateTimeConverter from "../../utils/dateTimeConverter";
import {getPersonList} from "../../http/personApi";
import dayjs from "dayjs";
import {unauthRedirect} from "../../utils/unauthRedirect";
import PersonSelector from "../ReferenceSelectors/PersonSelector";
import {badHttpRequestHandler} from "../../utils/badHttpRequestHandler";
import {notFoundHttpRequestHandler} from "../../utils/notFoundHttpRequestHandler";
import BackEndErrorBox from "../Form/ErrorBox/BackEndErrorBox";


const MeetingModal = ({modalType, open, onCancel, meetingId}) => {
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
    const [httpBadRequestResponseError, setHttpBadRequestResponseError] = useState(null);
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);

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
            .catch(e => unauthRedirect(e));
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
        onCancel();
    }
    const clearErrors = () => {
        setPlanedDateError(null);
        setPersonError(null);
        setHttpBadRequestResponseError(null);
    }

    const executeErrorHandlers = (e) => {
        unauthRedirect(e);
        setHttpBadRequestResponseError(badHttpRequestHandler(e));
        setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
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

    return (
        <Modal
            title={modalType === ADD_MODAL ? locale.locale.Meeting.Add : locale.locale.Meeting.Edit}
            open={open}
            destroyOnClose={true}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={() => {
                setSelectedPersonId(null);
                setSelectedPersonFullName(null);
                onCancel();
            }}
        >
            <Form
                labelCol={{ span: 8 }}
            >
                <BackEndErrorBox
                    httpBadRequestResponseError={httpBadRequestResponseError}
                    httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
                />
                {planedDateError &&
                    <div>
                        <Alert
                            message={planedDateError}
                            type="error"
                            showIcon
                        />
                        <p></p>
                    </div>
                }
                <Form.Item label={locale.locale.Meeting.PlannedDate}>
                    <DatePicker
                        onChange={(e) => {
                            if(e != null)
                                setPlannedDate(e)
                        }}
                        value={plannedDate}
                    />
                </Form.Item>
                {meetingId &&
                    <Form.Item label={locale.locale.Meeting.ActualDate}>
                        <DatePicker
                            onChange={(e) => {
                                if(e != null)
                                    setActualDate(e)
                            }}
                            value={actualDate}
                        />
                    </Form.Item>
                }
                {personError &&
                    <div>
                        <Alert
                            message={personError}
                            type="error"
                            showIcon
                        />
                        <p></p>
                    </div>
                }
                <Form.Item label={locale.locale.Meeting.Person}>
                    <PersonSelector
                        onSelect={selectedPersonHandler}
                        selectedPersonName={selectedPersonFullName}
                    />
                </Form.Item>
                <Form.Item label={locale.locale.Meeting.FollowUpWasSended}>
                    <Checkbox
                        onChange={(e) => setFollowUpIsSended(e.target.checked)}
                        checked={followUpIsSended}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default observer(MeetingModal);