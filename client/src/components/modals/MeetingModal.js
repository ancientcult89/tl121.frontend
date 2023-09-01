import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Checkbox, DatePicker, Dropdown, Form, Modal, Space} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {Context} from "../../index";
import {createMeeting, getMeeting, updateMeeting} from "../../http/meetingApi";
import dateTimeConverter from "../../utils/dateTimeConverter";
import {getPersonList} from "../../http/personApi";
import dayjs from "dayjs";


const MeetingModal = ({modalType, open, onCancel, meetingId}) => {
    const {meeting, locale, person} = useContext(Context);
    const [personDropdownItems, setPersonDropdownItems] = useState([]);
    const [plannedDate, setPlannedDate] = useState(null);
    const [actualDate, setActualDate] = useState(null);
    const [selectedPersonId, setSelectedPersonId] = useState(null);
    const [selectedPersonFullName, setSelectedPersonFullName] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [followUpIsSended, setFollowUpIsSended] = useState(false);
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
            .finally(() => setPersonDropdownItems(items));
        if(meetingId != null)
        {
            getMeeting(meetingId).then(data => {
                setActualDate(dayjs(dateTimeConverter.dateBackEndToDatePicker(data.meetingDate), formatDate));
                setPlannedDate(dayjs(dateTimeConverter.dateBackEndToDatePicker(data.meetingPlanDate), formatDate));
                setSelectedPersonId(data.personId);
                setSelectedPersonFullName(()=> {
                    person.persons.map(person => person.personId === data.personId
                        ? setSelectedPersonFullName(person.lastName + ' ' + person.firstName + ' ' + person.surName)
                        : locale.locale.Meeting.SelectPerson)
                });
                setFollowUpIsSended(data.followUpIsSended);
            });
        }
        setConfirmLoading(false);
    }, [modalType, meetingId]);

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
        let formData = {
            "meetingPlanDate": dateTimeConverter.datePickerToDate(plannedDate),
            "meetingDate": actualDate != null ? dateTimeConverter.datePickerToDate(actualDate) : null,
            "personId": selectedPersonId,
            "followUpIsSended": followUpIsSended,
        }
        if(modalType === ADD_MODAL)
        {
            createMeeting(formData).then((newMeeting) =>{
                meeting.setMeetings([...meeting.meetings, newMeeting])
                setSelectedPersonId(null);
                setSelectedPersonFullName(null);
                setPlannedDate(null);
                setActualDate(null);
                onCancel();
            });
        }
        else if(modalType === EDIT_MODAL)
        {
            formData = {...formData, "meetingId": meetingId};
            updateMeeting(formData).then((updatedMeeting) =>{
                meeting.setMeetings(meeting.meetings.map((item) => item.meetingId === meetingId ? {...updatedMeeting} : item))
                setSelectedPersonId(null);
                setSelectedPersonFullName(null);
                setPlannedDate(null);
                setActualDate(null);
                onCancel();
            });
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
            <Form>
                <Form.Item label={locale.locale.Meeting.PlannedDate}>
                    <DatePicker
                        onChange={(e) => {
                            if(e != null)
                                setPlannedDate(e)
                        }}
                        value={plannedDate}
                    />
                </Form.Item>
                <Form.Item label={locale.locale.Meeting.ActualDate}>
                    <DatePicker
                        onChange={(e) => {
                            if(e != null)
                                setActualDate(e)
                        }}
                        value={actualDate}
                    />
                </Form.Item>
                <Form.Item label={locale.locale.Meeting.Person}>
                    <Dropdown
                        menu={{
                            items: personDropdownItems
                        }}>
                        <Button style={{marginLeft: 5}}>
                            <Space>
                                {selectedPersonFullName || locale.locale.Meeting.SelectPerson}
                            </Space>
                        </Button>
                    </Dropdown>
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