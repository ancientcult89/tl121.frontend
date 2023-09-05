import {$authHost} from "./index";

export const getMeetingList = async (personId) => {
    const {data} = await $authHost.get('api/v1/Meeting/', {params : {personId: personId}});
    return data;
}

export const getMeeting = async (meetingId) => {
    const {data} = await $authHost.get('api/v1/Meeting/' + meetingId);
    return data;
}

export const createMeeting = async (meeting) => {
    const {data} = await $authHost.post('api/v1/Meeting/', meeting);
    return data;
}

export const deleteMeeting = async (meetingId) => {
    const {data} = await $authHost.delete('api/v1/Meeting/' + meetingId);
    return data;
}

export const updateMeeting = async (meeting) => {
    const {data} = await $authHost.put('api/v1/Meeting/' + meeting.meetingId, meeting);
    return data;
}

export const getPrevNotesAndFoals = async (meetingId, personId) => {
    const {data} = await $authHost.get('api/v1/Meeting/previous', {params: {meetingId: meetingId, personId: personId}});
    return data;
}

export const getMeetingGoals = async (meetingId) => {
    const {data} = await $authHost.get('api/v1/Meeting/' + meetingId + '/goal/');
    return data;
}

export const createMeetingGoal = async (meetingGoal) => {
    const {data} = await $authHost.post('api/v1/Meeting/' + meetingGoal.meetingId + '/goal/', meetingGoal);
    return data;
}

export const updateMeetingGoal = async (meetingGoal) => {
    const {data} = await $authHost.put('api/v1/Meeting/' + meetingGoal.meetingId + '/goal/', meetingGoal);
    return data;
}

export const deleteMeetingGoal = async (meetingId, meetingGoalId) => {
    const {data} = await $authHost.delete('api/v1/Meeting/' + meetingId + '/goal/' + meetingGoalId);
    return data;
}

export const getMeetingNotes = async (meetingId) => {
    const {data} = await $authHost.get('api/v1/Meeting/' + meetingId + '/note/');
    return data;
}

export const createMeetingNote = async (meetingNote) => {
    const {data} = await $authHost.post('api/v1/Meeting/' + meetingNote.meetingId + '/note/', meetingNote);
    return data;
}

export const updateMeetingNote = async (meetingNote) => {
    const {data} = await $authHost.put('api/v1/Meeting/' + meetingNote.meetingId + '/note/', meetingNote);
    return data;
}

export const deleteMeetingNote = async (meetingId, meetingNoteId) => {
    const {data} = await $authHost.delete('api/v1/Meeting/' + meetingId + '/note/' + meetingNoteId);
    return data;
}

export const getFollowUp = async (meetingId, personId) => {
    const {data} = await $authHost.get('api/v1/Meeting/' + meetingId + '/followup/', {params: {meetingId: meetingId, personId: personId}});
    return data;}

export const sendFollowUp = async (request) => {
    const {data} = await $authHost.post('api/v1/Meeting/' + request.meetingId + '/followup/', request);
    return data;}

export const getTaskList = async (personId) => {
    const {data} = await $authHost.get('api/v1/Task/', {params : {personId: personId}});
    return data;
}