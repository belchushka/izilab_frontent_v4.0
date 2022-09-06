import React, {useEffect, useMemo} from 'react';
import {CustomSelect, useCart} from "@box/shared";
import s from "./style.module.scss"
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {getCartOffice, setCartDate} from "@box/entities";
import moment from "moment";
import 'moment/dist/locale/ru';

interface DateFormControl {
    error: boolean
    removeError: () => void
    className?: string
    onSelect?: (val: any) => void
    onMenuOpen?: () => void
}

export const DateFormControl: React.FC<DateFormControl> = ({
                                                               error,
                                                               removeError,
                                                               className = "",
                                                               onMenuOpen,
                                                               onSelect = () => null
                                                           }) => {
    const office = useTypedSelector(getCartOffice)
    const {analysis, date} = useTypedSelector(state => state.cart)
    const dispatch = useTypedDispatch()
    const cartMethods = useCart()
    const dateSelectOptions = useMemo(() => {

        if (office) {
            const closed_at = office.closed_at.map(el => moment(el.timestamp))
            const date_arr = []
            const has_main = analysis.some(el => el.analysis_data?.is_main_biomaterial)
            for (let i = 0; i < 30; i++) {
                const day = moment.utc().add(office.city.utc, "hours")
                day.add({days: i})
                const dayNumber = day.isoWeekday()
                const {
                    from,
                    to
                } = office.schedule.find(el => (el.type == (has_main ? 'main' : 'additional')) && el.day == dayNumber)
                const fromLocal = moment.utc(from)
                const toLocal = moment.utc(to)
                day.locale("ru")
                const month_name = day.format("D MMMM")
                const day_name = day.format("dddd")
                const value = `${month_name}, ${day_name.slice(0, 1).toUpperCase() + day_name.slice(1)}`
                const is_disabled = closed_at.some(el => day.isSame(el, 'day')) || moment.duration(toLocal.diff(fromLocal)).asHours() < 1
                date_arr.push({
                    value: day.toDate(),
                    label: `${value} (с ${fromLocal.format("HH:mm")} до ${toLocal.format("HH:mm")})`,
                    disabled: is_disabled,
                })
            }
            return date_arr
        }
        return []
    }, [office?.id, analysis])
    const selectDate = (option: { value: Date, label: string, disabled: boolean }) => {
        dispatch(setCartDate(option.value))
    }
    useEffect(() => {
        cartMethods.countData()
    }, [date])
    return (
        <div className={`${s.cart_select_office} ${className}`}>
            <CustomSelect placeholder={'Выберите дату *'} error={error}
                          onMenuOpen={onMenuOpen}
                          onSelect={selectDate}
                          value={dateSelectOptions.find(el => moment(el.value).isSame(moment(date), 'day')) || null}
                          options={dateSelectOptions}/>
        </div>
    );
};
