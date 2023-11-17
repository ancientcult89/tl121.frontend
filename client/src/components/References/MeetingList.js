import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {deleteMeeting, getMeeting, getMeetingList} from "../../http/meetingApi";
import {Alert, Button, Checkbox, Popconfirm, Row, Space, Spin, Table} from "antd";
import {ADD_MODAL, EDIT_MODAL, MEETING_PROCESSING_ROUTE} from "../../utils/consts";
import Column from "antd/es/table/Column";
import MeetingModal from "../modals/MeetingModal";
import {useNavigate} from "react-router-dom";
import PersonSelector from "../ReferenceSelectors/PersonSelector";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {notFoundHttpRequestHandler} from "../../utils/notFoundHttpRequestHandler";

const MeetingList = observer(() => {
    const {meeting, locale, person} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [meetings, setMeetings] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(true);
    const navigate = useNavigate();
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);

    useEffect(() => {
        getMeetings(person.selectedPerson.personId);
        setIsLoading(false)
    }, [needUpdate, person.selectedPerson.personId])

    const clearFilteringMeetingList = () => {
        person.setSelectedPerson({
            personId: null,
            personName: ''
        });
    }

    function processMeeting(meetingId, personId) {
        getMeeting(meetingId)
            .then(() => {
                navigate(
                    MEETING_PROCESSING_ROUTE + '/?meetingId=' + meetingId + '&personId=' + personId
                )
            })
            .catch((e) => {
                setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
            })
    }
    function getMeetings(personId) {
        getMeetingList(personId)
            .then(data => {
                meeting.setMeetings(data);
                setMeetings(data);
            })
            .catch(e => {
                unauthRedirect(e);
            });
    }

    function delMeeting(meetingId) {
        setIsLoading(true);
        deleteMeeting(meetingId)
            .then(() => getMeetings(person.selectedPerson.personId))
            .catch(e => {
                unauthRedirect(e);
                setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
            })
            .finally(() => setIsLoading(false));
    }

    const selectedPersonHandler = (personId) => {
        person.persons.map(item => {
            if(item.personId === personId)
            {
                person.setSelectedPerson({
                    personId: item.personId,
                    personName: item.lastName + ' ' + item.firstName + ' ' + item.surName
                });
            }
        })
    }

    return (
        <div>
            <Row>
                <Button
                    type={"primary"}
                    style={{marginRight: 5}}
                    onClick={() => {
                        setModalType(ADD_MODAL);
                        setModalVisible(true);
                        setIsLoading(true);
                        setSelectedMeetingId(null);
                    }}
                >
                    {locale.locale.Meeting.Add}
                </Button>
                <PersonSelector
                    onSelect={selectedPersonHandler}
                    selectedPersonName={person.selectedPerson.personName}
                    onClear={clearFilteringMeetingList}
                    isClearable={true}
                />
            </Row>
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                {httpNotFoundRequestResponseError &&
                    <div style={{marginTop:5}}>
                        <Alert
                            message={httpNotFoundRequestResponseError}
                            type="error"
                            closable={true}
                            onClick={() => setHttpNotFoundRequestResponseError(null)}
                            showIcon
                        />
                        <p></p>
                    </div>
                }
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
                                    onConfirm={() => delMeeting(record.meetingId)}
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
                                <a onClick={() => processMeeting(record.meetingId, record.personId)}
                                >
                                    {locale.locale.Meeting.Process}
                                </a>
                            </Space>
                        )}
                    />
                </Table>
            </Spin>
            {modalVisible &&
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
            }
        </div>
    );
});

export default MeetingList;