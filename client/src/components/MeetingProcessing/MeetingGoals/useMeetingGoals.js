import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {
    createMeetingGoal,
    deleteMeetingGoal,
    getMeetingGoals,
    updateMeetingGoal
} from "../../../http/meetingApi";
import {unauthRedirect} from "../../../utils/unauthRedirect";


const useMeetingGoals = (meetingId) => {
    const {locale} = useContext(Context);
    const [goals, setGoals] = useState([]);
    const [goalText, setGoalText] = useState('');
    const [goalCompleteDescription, setGoalCompleteDescription] = useState('');
    const [editedMeetingGoalId, setEditedMeetingGoalId] = useState(null);
    const [isEditedGoal, setIsEditedGoal] = useState(false)

    useEffect(() => {
        getMeetingGoals(meetingId)
            .then(data => setGoals(data))
            .catch(e => {
                unauthRedirect(e);
            });
    }, []);

    const onSelectEditedGoalHandle = (meetingGoalId, goalContent, completedDescription) => {
        setEditedMeetingGoalId(meetingGoalId);
        setGoalText(goalContent);
        setGoalCompleteDescription(completedDescription)
        setIsEditedGoal(true);
    }

    const editGoalHandle = () => {
        let formData = {
            "meetingGoalDescription": goalText,
            "meetingId": meetingId,
            "meetingGoalId": editedMeetingGoalId,
            "completeDescription": goalCompleteDescription
        }

        updateMeetingGoal(formData)
            .then(updatedGoal => {
                setGoals(goals.map(item => item.meetingGoalId === editedMeetingGoalId ? {...updatedGoal} : item));
            })
            .catch(e => {
                unauthRedirect(e);
            });

        setEditedMeetingGoalId(null);
        setGoalText('')
        setIsEditedGoal(false);
    }

    const deleteGoalHandle = (meetingId, meetingGoalId) => {
        deleteMeetingGoal(meetingId, meetingGoalId)
            .then(() =>
                getMeetingGoals(meetingId)
                    .then(data => setGoals(data))
                    .catch(e => unauthRedirect(e))
            )
            .catch(e => unauthRedirect(e));
    }

    const addNoteHandle = () => {
        if(goalText == null || goalText === '')
            return;

        let formData = {
            "meetingGoalDescription": goalText,
            "meetingId": meetingId,
            "meetingGoalId": null
        }
        createMeetingGoal(formData)
            .then(newMeetingGoal => {
                setGoals([...goals, newMeetingGoal]);
            })
            .catch(e => unauthRedirect(e));
        setGoalText('');
    }

    return {
        locale,
        goals,
        onSelectEditedGoalHandle,
        setGoalText,
        goalText,
        isEditedGoal,
        addNoteHandle,
        editGoalHandle,
        deleteGoalHandle,
    };
};

export default useMeetingGoals;