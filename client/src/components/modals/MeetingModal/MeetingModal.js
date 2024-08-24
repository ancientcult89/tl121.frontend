import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Checkbox, DatePicker, Form, Modal} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../../utils/consts";
import {Context} from "../../../index";
import {createMeeting, getMeeting, updateMeeting} from "../../../http/meetingApi";
import dateTimeConverter from "../../../utils/dateTimeConverter";
import {getPersonList} from "../../../http/personApi";
import dayjs from "dayjs";
import PersonSelector from "../../ReferenceSelectors/PersonSelector/PersonSelector";
import BackEndErrorBox from "../../Form/ErrorBox/BackEndErrorBox";
import ErrorBox from "../../Form/ErrorBox/ErrorBox";
import withHttpErrorHandling from "../../../utils/withHttpErrorHandling";
import useMeetingModal from "./useMeetingModal";


const MeetingModal = (props) => {
    const {
        modalType,
        open,
        onCancel,
        meetingId,
    } = props;

    const {
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
    } = useMeetingModal(props);

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
                <ErrorBox error={planedDateError}/>
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
                <ErrorBox error={personError}/>
                <Form.Item label={locale.locale.Meeting.Person}>
                    <PersonSelector
                        onSelect={selectedPersonHandler}
                        selectedPersonName={selectedPersonFullName}
                    />
                </Form.Item>
                <Form.Item label={locale.locale.Meeting.FollowUpWasSent}>
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