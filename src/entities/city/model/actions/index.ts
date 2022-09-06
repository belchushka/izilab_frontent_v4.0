import {AppDispatch, AppThunkAction} from "@box/app/store";
import {$host} from "@box/app/http";
import {setCities, setCity, setCitySuggestion, setOffices} from "@box/entities";
import App from "@box/app/App";

export const getCitySuggestion: AppThunkAction = () => async (dispatch) => {
    const {data: ip} = await $host.get("user/get_ip")
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
    const token = "d9e40c314c1b459d03bac9b5b6bd4b7d4021166b";
    const {location} = await (await fetch(url + "94.180.237.93", {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        }
    })).json()
    if (location == null) {
        return null
    }
    try {
        const {data: city_instance} = await $host.get("/city/get_from_name", {
            params: {
                name: location.data.city
            }
        })

        dispatch(setCitySuggestion({
            id: city_instance.id,
            name: city_instance.name
        }))
    } catch (e) {
        return null
    }
}

export const setCurrentCity: AppThunkAction = (city_name: string) => async (dispatch) => {
    try {
        const {data: city_instance} = await $host.get("/city/get_from_name", {
            params: {
                name: city_name
            }
        })
        const {data: {offices, local_time}} = await $host.get("/city/offices", {
            params: {
                city_id: city_instance.id
            }
        })
        dispatch(setCity({
            ...city_instance,
            local_time: local_time
        }))
        dispatch(setOffices(offices))
        localStorage.setItem("user_city", city_name)
    } catch (e) {
        console.log(e)
    }
}

export const findCities: AppThunkAction = (query: string) => async (dispatch) => {
    try {
        const {data} = await $host.get("/city/find_city", {
            params: {
                query: query
            }
        })
        dispatch(  setCities(data))

    } catch (e) {
        dispatch(  setCities([]))

    }
}

export const getAllCities: AppThunkAction = ()=> async (dispatch) => {
    const {data} = await $host.get("/city/all")
    dispatch(  setCities(data))

}