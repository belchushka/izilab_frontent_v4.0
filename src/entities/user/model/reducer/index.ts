import {createSlice} from "@reduxjs/toolkit";

export interface IUser {
    name: string,
    surname: string,
    secondname: string,
    email: string,
    phone: string,
    birthday: string,
    is_male: boolean | null
    accept_agreement: boolean
}

interface IInitialState {
    user: IUser,
    parent: Omit<IUser, 'phone' | 'email' | 'is_male' | 'accept_agreement'>
}

const initialState: IInitialState = {
    user: {
        name:"",
        surname:"",
        secondname:"",
        email:"",
        phone:"",
        birthday: "",
        is_male: false,
        accept_agreement:true
    },
    parent:{
        name:"",
        surname:"",
        secondname:"",
        birthday: ""
    }
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state, action){
            state.user = {
                ...state.user,
                ...action.payload
            }
        },
        setParent(state, action){
            state.parent = {
                ...state.parent,
                ...action.payload
            }
        }
    }
})

export const userReducer = userSlice.reducer
export const {setUser, setParent} = userSlice.actions