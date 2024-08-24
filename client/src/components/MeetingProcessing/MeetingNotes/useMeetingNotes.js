import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {
    createMeetingGoal, createMeetingNote,
    deleteMeetingGoal, deleteMeetingNote,
    getMeetingGoals, getMeetingNotes,
    updateMeetingGoal, updateMeetingNote
} from "../../../http/meetingApi";
import {unauthRedirect} from "../../../utils/unauthRedirect";


const useMeetingNotes = (meetingId) => {
    const {locale} = useContext(Context);
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState('');
    const [noteFeedbackState, setNoteFeedbackState] = useState(true);
    const [editedMeetingNoteId, setEditedMeetingNoteId] = useState(null);
    const [isEditedNote, setIsEditedNote] = useState(false)

    useEffect(() => {
        getMeetingNotes(meetingId)
            .then(data => setNotes(data))
            .catch(e => unauthRedirect(e));
    }, [])

    const onSelectEditedNoteHandle = (meetingNoteId, noteContent, feedbackIsRequired) => {
        setEditedMeetingNoteId(meetingNoteId);
        setNoteText(noteContent);
        setNoteFeedbackState(feedbackIsRequired);
        setIsEditedNote(true);
    }

    const editNoteHandle = () => {
        if(noteText == null || noteText === '')
            return;

        let formData = {
            "meetingNoteContent": noteText,
            "feedbackRequired": noteFeedbackState,
            "meetingId": meetingId,
            "meetingNoteId": editedMeetingNoteId,
        }

        updateMeetingNote(formData)
            .then(updatedNote => {
                setNotes(notes.map(item => item.meetingNoteId === editedMeetingNoteId ? {...updatedNote} : item));
            })
            .catch(e => unauthRedirect(e));

        setNoteFeedbackState(true);
        setEditedMeetingNoteId(null);
        setNoteText('')
        setIsEditedNote(false);
    }

    const deleteNoteHandle = (meetingId, meetingNoteId) => {
        deleteMeetingNote(meetingId, meetingNoteId)
            .then(() =>
                getMeetingNotes(meetingId)
                    .then(data => setNotes(data))
                    .catch(e => unauthRedirect(e))
            )
            .catch(e => unauthRedirect(e));
    }

    const addNoteHandle = () => {
        let formData = {
            "meetingNoteContent": noteText,
            "feedbackRequired": noteFeedbackState,
            "meetingId": meetingId,
            "meetingNoteId": null,
        }
        createMeetingNote(formData)
            .then(newMeetingNote => {
                setNotes([...notes, newMeetingNote]);
            })
            .catch(e => unauthRedirect(e))
        setNoteText('');
    }

    return {
        locale,
        notes,
        onSelectEditedNoteHandle,
        deleteNoteHandle,
        setNoteText,
        noteText,
        noteFeedbackState,
        setNoteFeedbackState,
        isEditedNote,
        addNoteHandle,
        editNoteHandle,
    };
};

export default useMeetingNotes;