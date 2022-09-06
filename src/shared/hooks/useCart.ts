import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {useCallback, useMemo} from "react";
import {count_cart_price} from "@box/shared/lib/count_cart_price";
import {getCartOffice, setCart} from "@box/entities";
import moment from "moment";
import {count_cart_alerts} from "@box/shared";

export function useCart(){
    const {analysis: cart_analysis, date} = useTypedSelector(state=>state.cart)
    const city = useTypedSelector(state => state.city.city)
    const cart_office = useTypedSelector(getCartOffice)
    const dispatch = useTypedDispatch()

    const office_schedule = useMemo(()=>{
        if (cart_office){
            const today = moment.utc().add(cart_office.utc, 'hour');
            const todayDayNumber = today.isoWeekday();
            return cart_office.schedule
                .filter((el: any) => el.day == todayDayNumber)
                .map((el) => {
                    return {
                        from: moment.utc(moment.utc(el.from).format('HH:mm'), 'HH:mm'),
                        to: moment.utc(moment.utc(el.to).format('HH:mm'), 'HH:mm'),
                    };
                });
        }
        return null
    },[cart_office?.id])

    const countPrice = useCallback(()=>{
        try {
            const data = count_cart_price(cart_analysis, city.utc )
            dispatch(setCart(data))
        }catch (e) {

        }
    },[cart_analysis, city.utc])

    const countData = useCallback(()=>{
        try {
            const data = count_cart_alerts(cart_analysis, cart_office, date, office_schedule)
            dispatch(setCart(data))
        }catch (e) {

        }
    }, [cart_analysis, cart_office?.id, date])

    const disabledOffices = useMemo(()=>{
        let arr: Array<number> = []
        cart_analysis.forEach(analysis=>{
            const not_performed_in_offices = analysis.not_performed_in_offices.map(el=>el.office_id)
            arr = [...arr, ...not_performed_in_offices]
        })
        return Array.from(new Set(arr))
    },[cart_analysis])

    return {
        countPrice,
        countData,
        disabledOffices
    }
}