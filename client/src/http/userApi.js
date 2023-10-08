import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (newUser) => {
    const {data} = await $host.post('api/v1/user/register', newUser)

    return data
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/v1/user/login', {email, password})

    localStorage.setItem('token', data)
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