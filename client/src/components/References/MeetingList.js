import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {deleteMeeting, getMeetingList} from "../../http/meetingApi";
import {Button, Checkbox, Dropdown, Popconfirm, Row, Space, Spin, Table} from "antd";
import {ADD_MODAL, EDIT_MODAL, MEETING_PROCESSING_ROUTE} from "../../utils/consts";
import Column from "antd/es/table/Column";
import {getPersonList} from "../../http/personApi";
import MeetingModal from "../modals/MeetingModal";
import {useNavigate} from "react-router-dom";

const MeetingList = observer(() => {
    const {meeting, locale, person} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [needUpdate, setNeedUpdate] = useState(true);
    const [selectedPersonId, setSelectedPersonId] = useState(null);
    const [selectedPersonFullName, setSelectedPersonFullName] = useState(null);
    const [personDropdownItems, setPersonDropdownItems] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getMeetingList(selectedPersonId)
            .then(data => {
                meeting.setMeetings(data);
                setMeetings(data);
            })
            .then(() => {
                const items = [];
                getPersonList()
                    .then(persons => {
                        person.setPersons(persons)
                        persons.map((person) => items.push({
                            label: (
                                <div onClick={() => {
                                    selectedPersonHandler(person.personId);
                                }}>
                                    {person.lastName + ' ' + person.firstName + ' ' + person.surName}
                                </div>
                            ),
                            key: person.personId,
                        })
                    )})
                    .finally(() => setPersonDropdownItems(items));
            })
            .catch()
            .finally(() => setIsLoading(false));
    }, [needUpdate, meeting])

    const filteringMeetingList = (personId) => {
        getMeetingList(personId)
            .then(data => {
                meeting.setMeetings(data);
                setMeetings(data);
            })
    }

    const clearFilteringMeetingList = () => {
        getMeetingList()
            .then(data => {
                meeting.setMeetings(data);
                setMeetings(data);
            })
        setSelectedPersonFullName(null);
        setSelectedPersonId(null);
    }

    const selectedPersonHandler = (personId) => {
        person.persons.map(item => {
            if(item.personId === personId)
            {
                setSelectedPersonFullName(item.lastName + ' ' + item.firstName + ' ' + item.surName);
                setSelectedPersonId(item.personId);
            }
            filteringMeetingList(personId);
        })
    }

    return (
        <div>
            <Row>
                <Button onClick={clearFilteringMeetingList}>
                    {locale.locale.Meeting.ClearFiltering}
                </Button>
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
            </Row>
            <Button
                type={"primary"}
                style={{marginTop: 5}}
                onClick={() => {
                    setModalType(ADD_MODAL);
                    setModalVisible(true);
                    setIsLoading(true);
                    setSelectedMeetingId(null);
                }}
            >
                {locale.locale.Meeting.Add}
            </Button>
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                <Table dataSource={meetings} rowKey={(record) => record.meetingId } style={{marginTop:20}}>
                    <Column
                        title={locale.locale.Meeting.Person}
                        dataIndex="person"
                        key="1"
                        render={(record) => (
                            <a>
                                {record.firstName} {record.lastName}
                            </a>
                        )}
                    />
                    <Column
                        title={locale.locale.Meeting.PlannedDate}
                        key="2"
                        render={(record) => (
                            <a>
                                {new Date(record.meetingPlanDate).toLocaleDateString()}
                            </a>
                        )}
                    />
                    <Column
                        title={locale.locale.Meeting.ActualDate}
                        key="3"
                        render={(record) => (
                            <a>
                                {record.meetingDate != null ? new Date(record.meetingDate).toLocaleDateString() : locale.locale.NotSet}
                            </a>
                        )}
                    />
                    <Column
                        title={locale.locale.Meeting.FollowUpWasSended}
                        key="4"
                        render={(record) => (
                            <Checkbox checked={record.followUpIsSended}/>
                        )}
                    />
                    <Column
                        title={locale.locale.Action}
                        key="5"
                        render={(record) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    setModalType(EDIT_MODAL);
                                    setIsLoading(true);
                                    setModalVisible(true);
                                    setSelectedMeetingId(record.meetingId);
                                }}>
                                    {locale.locale.Edit}
                                </a>
                                <Popconfirm
                                    title={locale.locale.Meeting.DeleteTitle}
                                    description={locale.locale.Meeting.DeleteConfirmation}
                                    onConfirm={() => {
                                        setIsLoading(true);
                                        deleteMeeting(record.meetingId).then(() => {
                                            getMeetingList()
                                                .then(data => {
                                                meeting.setMeetings(data);
                                                setNeedUpdate(!needUpdate);
                                                })
                                                .finally(() => setIsLoading(false));
                                        })
                                    }}
                                    okText={locale.locale.Ok}
                                    cancelText={locale.locale.NO}
                                >
                                    <a>
                                        {locale.locale.Delete}
                                    </a>
                                </Popconfirm>
                            </Space>
                        )}
                    />
                    <Column
                        title={locale.locale.Meeting.Processing}
                        key="6"
                        render={(record) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    console.log('click')
                                    navigate(MEETING_PROCESSING_ROUTE, {state:{meetingId:record.meetingId, personId:record.personId}})
                                }}
                                >
                                    {locale.locale.Meeting.Process}
                                </a>
                            </Space>
                        )}
                    />
                </Table>
            </Spin>
            <MeetingModal
                modalType={modalType}
                open={modalVisible}
                onCancel={() => {
                    setNeedUpdate(!needUpdate);
                    setIsLoading(false);
                    setModalVisible(false);
                }}
                meetingId={modalVisible ? selectedMeetingId : null}
            />
        </div>
    );
});

export default MeetingList;