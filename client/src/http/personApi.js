import {$authHost} from "./index";

export const getPersonList = async () => {
    const {data} = await $authHost.get('api/v1/Person/')
    return data;
}

export const getFilteredPersonList = async () => {
    const {data} = await $authHost.get('api/v1/Person/filtered/')
    return data;
}

export const getPerson = async (personId) => {
    const {data} = await $authHost.get('api/v1/Person/' + personId)
    return data
}

export const createPerson = async (person) => {
    const {data} = await $authHost.post('api/v1/Person/', person);
    return data
}

export const deletePerson = async (personId) => {
    const {data} = await $authHost.delete('api/v1/Person/' + personId);
    return data
}

export const archivePerson = async (personId) => {
    const {data} = await $authHost.put('api/v1/Person/archive/' + personId);
    return data
}

export const sendGreetingMessage = async (personId) => {
    const {data} = await $authHost.put('api/v1/Person/testmail/' + personId);
    return data
}


export const updatePerson = async (person) => {
    const {data} = await $authHost.put('api/v1/Person/' + person.personId, person)
    return data
}