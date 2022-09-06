import moment from "moment";
import {IAnalysis} from "@box/entities";

export function check_card_type(analysis: IAnalysis, utc: number | null){
    const has_stock = analysis.analysis_data?.has_stock;
    if (!has_stock){
        return {
            type:'default',
            analysis: analysis
        }
    }else{
        let stock_actual = false
        if (utc){
            stock_actual=moment()
                .utc()
                .add(utc, 'hour')
                .isBefore(moment.utc(analysis.analysis_data?.stock_until));
        }
        if (has_stock) {
            if (stock_actual) {
                return {
                    type:'stock',
                    analysis: analysis
                }
            } else {
                return {
                    type:'default',
                    analysis: {
                        ...analysis,
                        analysis_data:{
                            ...analysis.analysis_data,
                            price:analysis.analysis_data?.prev_stock_price
                        }
                    }
                }
            }
        }
    }
}