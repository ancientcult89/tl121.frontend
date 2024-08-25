import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {deleteMeeting, getMeeting, getPagedMeetingList} from "../../../http/meetingApi";
import {Alert, Button, Checkbox, Popconfirm, Row, Space, Spin, Table} from "antd";
import {ADD_MODAL, EDIT_MODAL, MEETING_PROCESSING_ROUTE} from "../../../utils/consts";
import Column from "antd/es/table/Column";
import MeetingModal from "../../modals/MeetingModal/MeetingModal";
import PersonSelector from "../../ReferenceSelectors/PersonSelector/PersonSelector";
import useMeetingList from "./useMeetingList";

const MeetingList = observer(() => {
    const {
        locale,
        setModalType,
        setModalVisible,
        setIsLoading,
        selectedPersonHandler,
        person,
        clearFilteringMeetingList,
        isLoading,
        httpNotFoundRequestResponseError,
        setHttpNotFoundRequestResponseError,
        meetings,
        onPageChange,
        onShowSizeChange,
        pageInfo,
        setSelectedMeetingId,
        delMeeting,
        modalVisible,
        setNeedUpdate,
        needUpdate,
        modalType,
        processMeeting,
        selectedMeetingId,
    } = useMeetingList();

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
                <Table
                    dataSource={meetings}
                    rowKey={(record) => record.meetingId }
                    style={{marginTop:20}}
                    pagination={{
                        defaultCurrent: 1,
                        onChange: onPageChange,
                        showSizeChanger : true,
                        onShowSizeChange: onShowSizeChange,
                        total: pageInfo.totalRecords,
                        position: ["topLeft"]
                    }}
                >
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
                        title={locale.locale.Meeting.FollowUpWasSent}
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