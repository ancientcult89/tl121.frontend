import {$authHost} from "./index";

export const getGradeList = async () => {
    const {data} = await $authHost.get('api/v1/Grade/')
    return data;
}

export const getGrade = async (id) => {
    const {data} = await $authHost.get('api/v1/Grade/' + id)
    return data
}

export const createGrade = async (gradeName) => {
    const {data} = await $authHost.post('api/v1/Grade/', {gradeName});
    return data
}

export const deleteGrade = async (gradeId) => {
    console.log(gradeId)
    const {data} = await $authHost.delete('api/v1/Grade/' + gradeId);
    return data
}

export const updateGrade = async (gradeId, gradeName) => {
    const {data} = await $authHost.put('api/v1/Grade/' + gradeId, {gradeId, gradeName})
    return data
}