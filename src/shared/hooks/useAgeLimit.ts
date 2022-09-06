import {useTypedSelector} from "@box/app/store/hooks";
import {getCartOffice} from "@box/entities";
import {useMemo} from "react";
import moment from "moment";

export function useAgeLimit(){
    const birthday = useTypedSelector(state=> state.user.user.birthday)
    const analysis = useTypedSelector(state=>state.cart.analysis)
    const office = useTypedSelector(getCartOffice)
    const age_limit = useMemo<{
        need_parent: boolean
        office_limit: number
        analysis_limit: Array<string>
    }>(()=>{
        let office_limit: number = 0
        let need_parent: boolean = false
        const analysis_limit: Array<string> = []
        if (birthday){
            const date_birthday = moment(birthday, "DD.MM.YYYY", true)
            if (date_birthday.isValid()){
                const age = Math.floor(moment.duration(moment().diff(date_birthday)).asYears())
                if (age<16){
                    need_parent = true
                }
                if (office){
                    const office_age_limit = parseInt(office.age_limit)
                    if (age < office_age_limit) {
                        office_limit = office_age_limit
                    }
                }
                if (analysis.length>0){
                    const age_limits = analysis.map(el => {
                        return {
                            name: el.analysis_data.name,
                            limit: parseInt(el.analysis_data.age_limit || "0")
                        }
                    })
                    for (const {name, limit} of age_limits) {
                        if (limit > age) {
                            analysis_limit.push(name)
                        }
                    }
                }
            }
        }
        return {
            need_parent,
            office_limit,
            analysis_limit
        }
    }, [birthday, analysis, office?.id])

    return age_limit
}