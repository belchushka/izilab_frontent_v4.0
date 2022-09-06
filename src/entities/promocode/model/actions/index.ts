import {AppThunkAction} from "@box/app/store";
import {$host} from "@box/app/http";
import {setPromo} from "@box/entities";

export const applyPromo: AppThunkAction = (promo)=>async (dispatch) =>{
    try {
        const {data: promocode} = await $host.get("promocode/apply_promo", {
            params: {
                code: promo
            }
        })
        dispatch(setPromo(promocode))
        return true
    }catch (e) {
        throw e
    }
}