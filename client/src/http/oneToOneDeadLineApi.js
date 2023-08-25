import {$authHost} from "./index";

export const getOneTwoOne = async () => {
    const {data} = await $authHost.get('api/v1/OneToOneDeadline/')
    return data;
}