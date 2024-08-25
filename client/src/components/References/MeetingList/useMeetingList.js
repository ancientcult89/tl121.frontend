import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {deleteGrade, getGradeList} from "../../../http/gradeApi";
import useHttpErrorHandling from "../../../hooks/useHttpErrorHandling";
import {useNavigate} from "react-router-dom";
import {deleteMeeting, getMeeting, getPagedMeetingList} from "../../../http/meetingApi";
import {MEETING_PROCESSING_ROUTE} from "../../../utils/consts";
import {notFoundHttpRequestHandler} from "../../../utils/notFoundHttpRequestHandler";
import {unauthRedirect} from "../../../utils/unauthRedirect";


const useMeetingList = () => {
    const {meeting, locale, person} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [meetings, setMeetings] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(true);
    const navigate = useNavigate();
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);
    const [pageInfo, setPageInfo] = useState({
        totalRecords: 1,
        currentPage: 1
    })

    useEffect(() => {
        getMeetings(person.selectedPerson.personId);
        setIsLoading(false)
    }, [needUpdate, person.selectedPerson.personId])

    const clearFilteringMeetingList = () => {
        person.setSelectedPerson({
            personId: null,
            personName: '',
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

    const onPageChange = (pageNumber) => {
        getMeetings(person.selectedPerson.personId, pageNumber, 10);
    };
    const onShowSizeChange = (currentPage, pageSize) => {
        getMeetings(person.selectedPerson.personId, currentPage, pageSize);
    };
    function getMeetings(personId, currentPage = 1, pageSize = 10) {
        const meetingPagedRequest = {
            personId: personId,
            currentPage: currentPage,
            pageSize: pageSize
        };

        getPagedMeetingList(meetingPagedRequest)
            .then(data => {
                meeting.setMeetings(data.meetings);
                setMeetings(data.meetings);
                setPageInfo({
                    totalRecords: data.pageInfo.totalItems,
                    currentPage: data.pageInfo.currentPage
                });
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

    return {
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
    };
};

export default useMeetingList;