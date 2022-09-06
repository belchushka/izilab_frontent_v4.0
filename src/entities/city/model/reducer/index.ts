import {createSlice} from "@reduxjs/toolkit";

export interface ICity {
    id: number | null,
    name: string | null,
    latitude: number | null,
    longitude: number | null,
    utc: number | null
    local_date: Date | null
}

interface IInitialState {
    city: ICity,
    suggested_city: Omit<ICity, 'latitude' | 'longitude' | 'local_date' | 'utc'>
    cities: Array<ICity>

}


const initialState: IInitialState = {
    city: {
        id: null,
        name: null,
        latitude: null,
        longitude: null,
        local_date: null,
        utc: null
    },
    suggested_city: {
        id: null,
        name: null
    },
    cities: []
}

const citySlice = createSlice({
    name: "city",
    initialState: initialState,
    reducers: {
        setCity(state, action) {
            localStorage.setItem("user_city", JSON.stringify(action.payload))
            state.city = action.payload
        },
        setCitySuggestion(state, action) {
            state.suggested_city = action.payload
        },
        setCities(state, action) {
            state.cities = action.payload
        }
    }
})

export const cityReducer = citySlice.reducer
export const {setCity, setCitySuggestion, setCities} = citySlice.actions