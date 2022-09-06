import {createSlice} from "@reduxjs/toolkit";
import {ICity} from "@box/entities";

export interface IOffice {
    city: ICity;
    closed_at: Array<{
        day: number
        timestamp: Date
    }>;
    id: number
    code: number
    partner_code: string
    partner_name: string
    city_id: number | null
    address: string
    latitude: number
    longitude: number
    order_deadline: string
    alert: string
    map_steps: string
    parking_info: string
    age_limit: string
    email: string
    manager_id: number | null
    phone_number: string
    map_icon: string | null
    utc: number
    message_in_mail: string | null
    additional_message_in_doc: string | null
    not_performed_analysis: Array<number>
    created_at: Date
    deleted_at: Date | null
    schedule: Array<any>
}

interface IInitialState {
    office: IOffice | null
    offices: Array<IOffice>
}

const initialState: IInitialState = {
    office: null,
    offices: []
}

const officeSlice = createSlice({
    name:"office",
    initialState,
    reducers:{
        setOffices(state, action){
            state.offices = action.payload
        },
        setOffice(state, action){
            state.office = action.payload
        }
    }
})

export const officeSReducer = officeSlice.reducer
export const {setOffices, setOffice} = officeSlice.actions
