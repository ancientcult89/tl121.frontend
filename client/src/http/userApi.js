import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (newUser) => {
    const {data} = await $host.post('api/v1/user/register', newUser)

    return data
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/v1/user/login', {email, password})

    localStorage.setItem('token', data.token)
    return data
}

export const recoveryPassword = async (email) => {
    const {data} = await $host.post('api/v1/user/recoverypassword', {email})

    return data
}

export const check = async () => {
    const {data} = await $authHost.get('api/v1/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getUserList = async () => {
    const {data} = await $authHost.get('api/v1/User/')
    return data;
}

export const getUser = async (id) => {
    const {data} = await $authHost.get('api/v1/User/' + id)
    return data
}

export const deleteUser = async (userId) => {
    const {data} = await $authHost.delete('api/v1/User/' + userId);
    return data
}

export const updateUser = async (user) => {
    const {data} = await $authHost.put('api/v1/User/' + user.userId, user)
    return data
}

export const changePassword = async (request) => {
    const {data} = await $authHost.put('api/v1/User/' + request.userId + '/changepassword/', request)
    return data
}

export const changeLocale = async (locale) => {
    await $authHost.post('api/v1/user/changelocale', {locale})

    return;
}

export const getCurrentUser = async () => {
    const {data} = await $authHost.get('api/v1/User/currentUserId')
    return data
}

export const getUserMailSettings = async (id) => {
    const {data} = await $authHost.get('api/v1/User/' + id + '/mailsettings/')
    return data
}

export const setUserMailSettings = async (userMailSettings) => {
    const {data} = await $authHost.put('api/v1/User/' + userMailSettings.userId + '/mailsettings/', userMailSettings)
    return data
}