import {$authHost} from "./index";

export const getProjectList = async () => {
    const {data} = await $authHost.get('api/v1/Project/')
    return data;
}

export const getProject = async (projectId) => {
    const {data} = await $authHost.get('api/v1/Project/' + projectId)
    return data
}

export const createProject = async (projectTeamName) => {
    const {data} = await $authHost.post('api/v1/Project/', {projectTeamName});
    return data
}

export const deleteProject = async (projectId) => {
    const {data} = await $authHost.delete('api/v1/Project/' + projectId);
    return data
}

export const updateProject = async (projectTeamId, projectTeamName) => {
    const {data} = await $authHost.put('api/v1/Project/' + projectTeamId, {projectTeamId, projectTeamName})
    return data
}

export const getPersonProjects = async (personId) => {
    const {data} = await $authHost.get('api/v1/Project/personProjects/' + personId)
    return data
}

export const addProjectToPerson = async (formData) => {
    const {data} = await $authHost.post('api/v1/Project/personProjects/' + formData.personId, formData);
    return data
}

export const deleteProjectToPerson = async (formData) => {
    const {data} = await $authHost.delete('api/v1/Project/personProjects/' + formData.personId, {data: formData});
    return data
}