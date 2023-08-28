import {$authHost} from "./index";

export const getMeetingList = async (personId) => {
    const {data} = await $authHost.get('api/v1/Meeting/', {params : {personId: personId}})
    return data;
}

export const getMeeting = async (meetingId) => {
    const {data} = await $authHost.get('api/v1/Meeting/' + meetingId)
    return data
}

export const createMeeting = async (meeting) => {
    const {data} = await $authHost.post('api/v1/Meeting/', meeting);
    return data
}

export const deleteMeeting = async (meetingId) => {
    const {data} = await $authHost.delete('api/v1/Meeting/' + meetingId);
    return data
}

export const updateMeeting = async (meeting) => {
    const {data} = await $authHost.put('api/v1/Meeting/' + meeting.meetingId, meeting)
    return data
}