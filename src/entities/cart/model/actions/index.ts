import {AppThunkAction} from "@box/app/store";
import {$host} from "@box/app/http";
import {clearCart, IAnalysis, setCart, setGifts} from "@box/entities";

export const countCartPriceWithoutData: AppThunkAction = (cart) => async (dispatch) => {
    try {
        const {data}: any = await $host.post("analysis/count_cart_price_without_data", {
            cart: cart
        })
        const new_cart = {
            price_without_stock:data.price_without_stock,
            total_price: data.total_price,
            sampling_price:data.sampling_price,
            sample_preparation_price:data.sample_preparation_price,
        }
        dispatch(setCart(new_cart))
    } catch (e: any) {
        if (e.response.status == 410){
            localStorage.removeItem("user_cart")
            dispatch(clearCart())
        }
        return e
    }
}

export const countCartPrice: AppThunkAction = (cart, officeId, date) => async (dispatch) => {
    try {
        if (cart.length != 0){
            const {data}: any = await $host.post("analysis/count_cart_price", {
                cart: cart,
                officeId,
                date
            })
            const new_cart = {
                price: data.total_price,
                analysis: data.analysis,
                samplings: data.samplings,
                price_without_stock:data.price_without_stock,
                sampling_price:data.sampling_price,
                sample_preparation_price:data.sample_preparation_price,
                sample_preparations: data.sample_preparations,
                not_performed_ids: data.not_performed_ids,
                can_continue: data.can_continue,
                alerts: data.alerts,
                piece_alerts: data.piece_alerts
            }

            dispatch(setCart(new_cart))
            dispatch(setGifts( data.gifts))
            // if (data.sampling_price + data.price_with_stock + data.sample_preparation_price < 5000){
            //     dispatch(setCartGifts([]))
            // }
        }else{
            dispatch(clearCart())
        }
    } catch (e) {
        return e
    }
}

export const checkCartValid: AppThunkAction = (ids) => async (dispatch)=>{
    try {
        const {data: analysis} = await $host.post("/analysis/cart_valid", {
            cart: ids
        })
        dispatch(setCart({
            ids: ids,
            analysis: analysis
        }))

        return
    }catch (e: any) {
        if (e.response.status == 410){
            localStorage.removeItem("user_cart")
            dispatch(clearCart())
        }
        return e
    }
}