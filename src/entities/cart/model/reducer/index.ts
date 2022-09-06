import {createSlice} from "@reduxjs/toolkit";
import {IAnalysis} from "@box/entities";
import {AppState} from "@box/app/store";

interface IInitialState {
    ids: Array<number>
    analysis: Array<IAnalysis>
    gifts: Array<number>
    total_price: number
    sample_preparation_price: number
    sampling_price: number
    price_without_stock: number
    office_id: number | null
    date: Date | null
    samplings: Array<ISampling>
    sample_preparations: Array<ISampling>
    alerts: Array<string>
    piece_alerts: Array<string>
    can_continue: boolean
}

interface ISampling {
    id: number
    price: number
}

const initialState: IInitialState = {
    ids: [],
    analysis: [],
    gifts: [],
    samplings: [],
    sample_preparations: [],
    total_price: 0,
    sample_preparation_price: 0,
    sampling_price: 0,
    price_without_stock: 0,
    office_id: null,
    date: null,
    alerts: [],
    piece_alerts: [],
    can_continue: false
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        setCartOffice(state, action) {
            state.office_id = action.payload
        },
        addGift(state, action) {
            state.gifts.push(action.payload)
        },
        removeGift(state, action) {
            state.gifts = []
        },
        addAnalysis(state, action) {
            let prev_analysis = localStorage.getItem("user_cart")
            if (prev_analysis){
                let data: Array<IAnalysis> = JSON.parse(prev_analysis)
                localStorage.setItem("user_cart", JSON.stringify([action.payload.id, ...data]))
            }
            state.ids.push(action.payload.id)
            state.analysis.push(action.payload)
        },
        removeAnalysis(state, action) {
            let prev_analysis = localStorage.getItem("user_cart")
            if (prev_analysis){
                let data: Array<IAnalysis> = JSON.parse(prev_analysis)
                localStorage.setItem("user_cart", JSON.stringify(data.filter(el=>el != action.payload)))
            }
            state.ids = state.ids.filter(el => el != action.payload)
            state.analysis = state.analysis.filter(el => el.id != action.payload)
        },
        clearCart(state) {
            localStorage.setItem("user_cart", JSON.stringify([]))
            return initialState
        },
        setCartDate(state, action) {
            state.date = action.payload
        }
    }
})

export const cartReducer = cartSlice.reducer
export const {
    setCart,
    addAnalysis,
    removeAnalysis,
    addGift,
    removeGift,
    clearCart,
    setCartOffice,
    setCartDate
} = cartSlice.actions
export const getTotalPrice = (state: AppState) => {
    const cart = state.cart
    const promocode = state.promocode.promocode
    let total_price = cart.total_price + cart.sample_preparation_price + cart.sampling_price
    if (promocode){
        if (promocode.discount_amount){
            total_price = total_price-promocode.discount_amount>0 ? total_price-promocode.discount_amount : 0
        }else if (promocode.discount_percent){
            total_price = total_price - total_price*promocode.discount_percent
        }
    }
    return Math.floor(total_price)
}

export const getCartOffice = (state: AppState) => {
    const cart_office = state.cart.office_id
    const offices = state.office.offices

    return offices.find(el => el.id == cart_office)
}

export const getCartGift = (state: AppState) => {
    const cart_gift = state.cart.gifts[0]
    const gifts = state.analysis.gifts

    return gifts.find(el => el.id == cart_gift)
}