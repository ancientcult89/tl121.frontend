import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const $host = axios.create({
    baseURL: baseUrl,
});

const $authHost = axios.create({
    baseURL: baseUrl,
});

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost,
}