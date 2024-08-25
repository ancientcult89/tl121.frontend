import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {notFoundHttpRequestHandler} from "../../../utils/notFoundHttpRequestHandler";
import {unauthRedirect} from "../../../utils/unauthRedirect";
import {completeTask, getTaskList} from "../../../http/meetingApi";


const useTaskList = ({personId, showPersonField = true, currentMeetingId = null}) => {
    const {locale} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);

    useEffect(() => {
        getTasks(personId, currentMeetingId);
        setIsLoading(false);
    }, [personId]);

    const getTasks = (personId, currentMeetingId) => {
        getTaskList(personId, currentMeetingId)
            .then(data => {
                setTasks(data);
            })
            .catch(e => unauthRedirect(e))
    }

    function completeTaskHandler(meetingGoalId) {
        setIsLoading(true);
        let formData = {
            "goalId": meetingGoalId,
        }
        completeTask(formData)
            .then(() => {
                getTasks(personId, currentMeetingId);
            })
            .catch(e => {
                unauthRedirect(e);
                setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
            })
            .finally(() => setIsLoading(false))
    }

    return {
        locale,
        httpNotFoundRequestResponseError,
        setHttpNotFoundRequestResponseError,
        isLoading,
        tasks,
        completeTaskHandler,
    };
};

export default useTaskList;