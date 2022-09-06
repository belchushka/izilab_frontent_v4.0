import {createSlice} from "@reduxjs/toolkit";

interface IPromocode {
    id: number
    code: string
    available_until: Date
    discount_amount: number | null
    discount_percent: number | null
}

interface IInitialState {
    promocode: IPromocode | null
    current_promo: string
}

const initialState: IInitialState = {
    promocode: null,
    current_promo: ""
}

const promocodeSlice = createSlice({
    name: "promocode",
    initialState,
    reducers:{
        setPromo(state, action){
            state.promocode = action.payload
        },
        setCurrentPromo(state, action){
            state.current_promo = action.payload
        }
    }
})

export const {setPromo, setCurrentPromo} = promocodeSlice.actions
export const promocodeReducer = promocodeSlice.reducer