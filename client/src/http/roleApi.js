import {$authHost} from "./index";

export const getRoleList = async () => {
    const {data} = await $authHost.get('api/v1/Role/')
    return data;
}

export const getRole = async (id) => {
    const {data} = await $authHost.get('api/v1/Role/' + id)
    return data
}

export const createRole = async (roleName) => {
    const {data} = await $authHost.post('api/v1/Role/', {roleName});
    return data
}

export const deleteRole = async (roleId) => {
    const {data} = await $authHost.delete('api/v1/Role/' + roleId);
    return data
}

export const updateRole = async (roleId, roleName) => {
    const {data} = await $authHost.put('api/v1/Role/' + roleId, {roleId, roleName})
    return data
}