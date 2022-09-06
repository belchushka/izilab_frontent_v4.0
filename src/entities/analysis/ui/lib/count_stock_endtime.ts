import moment from "moment";
import {declOfNum} from "@box/shared";

export function count_stock_endtime(type: "stock" | "default", stock_until: Date | null){
    if (type !== "stock") return 0
    if (!stock_until) return 0
    const start = moment(new Date()).utc(true)
    const end = moment.utc(stock_until)
    const duration = moment.duration(end.diff(start))
    const days = duration.asDays();
    const hours = duration.hours();
    const minutes = duration.minutes();
    let str = `${days.toFixed()} ${declOfNum(days, ['день', 'дня', 'дней'])} ${hours.toFixed()} ${declOfNum(hours, ['час', 'часа', 'часов'])}`
    if (days == 0) {
        str += ` ${minutes.toFixed()} ${declOfNum( days, ['минута', 'минуты', 'минут'])}`
    }
    return str
}