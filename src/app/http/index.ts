import axios, {AxiosRequestConfig} from "axios";

//http://127.0.0.1:8000/api
//https://izilab.ru/api

const $host = axios.create({
    baseURL:"https://izilab.ru/api"
})

const $autHost = axios.create({
    baseURL:""
})

$autHost.interceptors.request.use( async (config:AxiosRequestConfig)=>{
    if (config.headers){
        config.headers.authorization = ""
    }
    return config
})

export {$host,$autHost}