import {useCallback, useReducer} from "react";
import {IUser} from "@box/entities";
import moment from "moment";

interface IInitialState {
    name: boolean
    surname: boolean
    secondname: boolean
    birthday: boolean
    parent_name: boolean
    parent_secondname: boolean
    parent_surname: boolean
    parent_birthday: boolean
    phone: boolean
    email: boolean
    is_male: boolean
    accept_agreement: boolean
}

const initialState: IInitialState = {
    name: false,
    surname: false,
    secondname: false,
    phone: false,
    email: false,
    parent_birthday: false,
    parent_name: false,
    parent_surname: false,
    parent_secondname: false,
    birthday: false,
    is_male: false,
    accept_agreement: false
}

const reducer = (state: IInitialState, action: { type: string, payload: boolean }) => {
    switch (action.type) {
        case 'name':
            return {
                ...state,
                name: action.payload
            }
        case 'surname':
            return {
                ...state,
                surname: action.payload
            }
        case 'secondname':
            return {
                ...state,
                secondname: action.payload
            }
        case 'parent_name':
            return {
                ...state,
                parent_name: action.payload
            }
        case 'parent_surname':
            return {
                ...state,
                parent_surname: action.payload
            }
        case 'parent_secondname':
            return {
                ...state,
                parent_secondname: action.payload
            }
        case 'birthday':
            return {
                ...state,
                birthday: action.payload
            }
        case 'parent_birthday':
            return {
                ...state,
                parent_birthday: action.payload
            }
        case 'phone':
            return {
                ...state,
                phone: action.payload
            }
        case 'email':
            return {
                ...state,
                email: action.payload
            }
        case 'is_male':
            return {
                ...state,
                is_male: action.payload
            }
        case 'accept_agreement':
            return {
                ...state,
                accept_agreement: action.payload
            }
        default:
            return initialState
    }
}

const check_date_validity = (date: string)=>{
    const moment_date = moment(date, 'DD.MM.YYYY',true)
    if (moment_date.isValid()){
        return moment_date
    }
    return false
}

export function useValidatePersonalInfo(user: { user: IUser, parent: Omit<IUser, 'phone' | 'email' | 'is_male' | 'accept_agreement'> }, need_parent: boolean) {
    const [errors, dispatch] = useReducer(reducer, initialState)
    const validate = useCallback(() => {
        const userValues = Object.entries(user.user)
        const parentValues = Object.entries(user.parent)
        let can_continue = true
        userValues.forEach(([key, value]) => {
            if (typeof value == 'string' && value.trim().length == 0) {
                can_continue = false
                dispatch({
                    type: key,
                    payload: true
                })
            }
        })
        if (!user.user.email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
            can_continue = false
            dispatch({
                type: 'email',
                payload: true
            })
        }
        if (user.user.is_male == null){
            can_continue = false

            dispatch({
                type: 'is_male',
                payload: true
            })
        }
        if (!user.user.accept_agreement){
            can_continue = false

            dispatch({
                type: 'accept_agreement',
                payload: true
            })
        }

        if (user.user.birthday.length<10 || !check_date_validity(user.user.birthday)){
            can_continue = false

            dispatch({
                type: 'birthday',
                payload: true
            })
        }

        if (user.user.phone.length<16){
            can_continue = false

            dispatch({
                type: 'phone',
                payload: true
            })
        }

        if (need_parent) {
            parentValues.forEach(([key, value]) => {
                if (value.trim().length == 0) {
                    can_continue = false
                    dispatch({
                        type: "parent_" + key,
                        payload: true
                    })
                }
            })
            const parent_age = moment.duration(moment().diff(moment(user.parent.birthday, "DD.MM.YYYY"))).asYears()
            if (parent_age < 18 ||  !check_date_validity(user.parent.birthday)) {
                can_continue = false
                dispatch({
                    type: "parent_birthday",
                    payload: true
                })
            }
            if (user.parent.birthday.length<10){
                can_continue = false
                dispatch({
                    type: 'parent_birthday',
                    payload: true
                })
            }
        }
        setTimeout(() => {
            dispatch({
                type: 'default',
                payload: false
            })
        }, 1000)
        return can_continue
    }, [user])
    return {
        validate,
        errors,
        dispatch
    }
}