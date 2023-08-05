import {$authHost} from "./index";

export const getGradeList = async () => {
    const {data} = await $authHost.get('api/v1/Grade/')
    return data;
}

export const getGrade = async (id) => {
    const {data} = await $authHost.get('api/v1/Grade/' + id)

    localStorage.setItem('token', data)
    return data
}
//
// export const check = async () => {
//     const {data} = await $authHost.get('api/v1/user/auth' )
//     localStorage.setItem('token', data.token)
//     return jwt_decode(data.token)
// }