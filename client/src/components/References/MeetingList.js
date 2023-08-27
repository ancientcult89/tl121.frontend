import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {deleteMeeting, getMeetingList} from "../../http/meetingApi";
import {Button, Checkbox, Dropdown, Popconfirm, Row, Space, Spin, Table} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {deleteGrade, getGradeList} from "../../http/gradeApi";
import Column from "antd/es/table/Column";
import {getPersonList} from "../../http/personApi";

const MeetingList = observer(() => {
    const {meeting, locale} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [needUpdate, setNeedUpdate] = useState(true);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [personDropdownItems, setPersonDropdownItems] = useState([]);

    useEffect(() => {
        getMeetingList()
            .then(data => {meeting.setMeetings(data)})
            .then(() => {
                const items = [];
                getPersonList()
                    .then(persons => persons.map((person) => items.push({
                            label: person.lastName + ' ' + person.firstName + ' ' + person.surName,
                            key: person.personId,
                        })
                    ))
                    .finally(() => setPersonDropdownItems(items));
            })
            .catch()
            .finally(() => setIsLoading(false));
    }, [needUpdate, meeting])

    return (
        <div>
            <Row>
                <Button type={"primary"}>
                    {locale.locale.Meeting.Filter}
                </Button>
                <Button style={{marginLeft: 5}}>
                    {locale.locale.Meeting.ClearFiltering}
                </Button>
                <Dropdown
                    menu={{
                    items: personDropdownItems
                }}>
                    <Button style={{marginLeft: 5}}>
                        <Space>
                            {selectedPerson || locale.locale.Meeting.SelectPerson}
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
                    setSelectedMeeting(null);
                }}
            >
                {locale.locale.Meeting.Add}
            </Button>
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                <Table dataSource={meeting.meetings} rowKey={(record) => record.meetingId } style={{marginTop:20}}>
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
                                {new Date(record.meetingDate).toLocaleDateString()}
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
                        key="2"
                        render={(record) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    setModalType(EDIT_MODAL);
                                    setIsLoading(true);
                                    setModalVisible(true);
                                    setSelectedMeeting(record.gradeId);
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
                </Table>
            </Spin>
        </div>
    );
});

export default MeetingList;