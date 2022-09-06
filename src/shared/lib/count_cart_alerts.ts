import {IAnalysis, IOffice} from "@box/entities";
import moment from "moment";

export function count_cart_alerts(analysis: Array<IAnalysis>, office: IOffice | undefined, date: Date | null, officeSchedule: Array<any> | null){
    const alerts = []; //Alerts which blocks next steps
    const piece_alerts = []; //Alerts which doesn't block next steps
    //-------------------
    //If date exists computing alerts
    //-------------------
    if (date && office && officeSchedule) {
        const moment_date = moment.utc(date)
        const today = moment.utc().add(office.city.utc, 'hour');
        let deadline = null;
        //Find out if there is any main analysis in cart
        //-------------------
        const main_analysis = analysis.filter(
            (el) => el.analysis_data?.is_main_biomaterial,
        );
        console.log(main_analysis);
        //-------------------
        if (main_analysis.length>0){
            deadline = officeSchedule[0].to.clone().subtract(
                Math.abs(parseInt(office.order_deadline)),
                'minutes',
            );
        }else {
            deadline = officeSchedule[1].to.clone().subtract(
                Math.abs(parseInt(office.order_deadline)),
                'minutes',
            );
        }
        console.log(moment_date.format());
        console.log(today.format())
        console.log(deadline.format());
        const closed_at = officeSchedule[1].to.clone().subtract(
            Math.abs(parseInt(office.order_deadline)),
            'minutes',
        );
        //If user picked same day as today
        //-------------------
        if (moment_date.isSame(today, 'day')) {
            if (
                today.isAfter(deadline.clone().subtract(30, 'minutes'), 'minute') &&
                today.isBefore(deadline, 'minute')
            ) {
                piece_alerts.push('Оплатите заказ до ' + deadline.format('HH:mm'));
            }
            if (today.isAfter(closed_at, 'hours')) {
                alerts.push('Офис уже закрыт');
            }
            if (main_analysis.length > 0) {
                for (const main_analysis_item of main_analysis) {
                    if (main_analysis_item.analysis_data?.available_until){
                        const available_until = moment(
                            moment(main_analysis_item.analysis_data?.available_until)
                                .utc(false)
                                .format('HH:mm'),
                            'HH:mm',
                        );

                        let main_time = null;
                        if (available_until.isAfter(officeSchedule[0].to, 'minute')) {
                            main_time = officeSchedule[0].to;
                        } else {
                            main_time = available_until;
                        }
                        if (today.isAfter(main_time, 'minute')) {
                            alerts.push('Некоторые анализы уже нельзя сдать сегодня');
                        }
                    }else{
                        if (today.isAfter(officeSchedule[0].to, 'minute')) {
                            alerts.push('Некоторые анализы уже нельзя сдать сегодня');
                        }
                    }

                }
            }
        }
        //-------------------
    }
    //-------------------
    return {
        can_continue: alerts.length == 0,
        alerts: Array.from(new Set(alerts)),
        piece_alerts: Array.from(new Set(piece_alerts)),
    }
}