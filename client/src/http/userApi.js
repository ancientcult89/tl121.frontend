import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/v1/user/registration', {email, password, role: 'ADMIN'})

    localStorage.setItem('token', data)
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