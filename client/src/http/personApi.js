import {$authHost} from "./index";

export const getPersonList = async () => {
    const {data} = await $authHost.get('api/v1/Person/')
    console.log(data);
    return data;
}

export const getPerson = async (personId) => {
    const {data} = await $authHost.get('api/v1/Person/' + personId)
    return data
}

export const createPerson = async (personName) => {
    const {data} = await $authHost.post('api/v1/Person/', {personName});
    return data
}

export const deletePerson = async (personId) => {
    console.log(personId)
    const {data} = await $authHost.delete('api/v1/Person/' + personId);
    return data
}

export const updatePerson = async (personId, personName) => {
    const {data} = await $authHost.put('api/v1/Person/' + personId, {personId, personName})
    return data
}