import moment from "moment";
import {IAnalysis} from "@box/entities";

export function count_stacks(analysis: Array<IAnalysis>, utc: number | null) {
    //Filling payment info array with data related to money
    //-------------------
    const analysis_payment_info = [];
    for (const el of analysis) {
        const has_stock = el.analysis_data?.has_stock;
        let stock_actual = false
        if(utc){
            stock_actual =  moment()
                .utc()
                .add(utc, 'hour')
                .isBefore(moment.utc(el.analysis_data?.stock_until));
        }
        let price_before_stock = 0;
        let current_price = 0;
        // if (el.is_complex){
        //     for(const el1 of el.complex_compound){
        //         analysis_payment_info.push({
        //             id: el1.id,
        //             sampling_price: el1.analysis_data?.material_sampling_price,
        //             sampling_name: el1.analysis_data?.material_sampling,
        //             price_before_stock: 0,
        //             current_price: 0,
        //             sample_preparation_stack_ids: [],
        //             sample_preparation_price: el1.analysis_data?.sample_preparation_price,
        //         });
        //     }
        // }
        if (el.analysis_data){
            if (has_stock) {
                if (stock_actual) {
                    price_before_stock = el.analysis_data.prev_stock_price;
                    current_price = el.analysis_data.price;
                } else {
                    price_before_stock = el.analysis_data.prev_stock_price;
                    current_price = el.analysis_data.prev_stock_price;
                }
            } else {
                price_before_stock = el.analysis_data.price;
                current_price = el.analysis_data.price;
            }
        }
        analysis_payment_info.push({
            id: el.id,
            sampling_price: el.analysis_data?.material_sampling_price,
            sampling_name: el.analysis_data?.material_sampling,
            price_before_stock: price_before_stock,
            current_price: current_price,
            sample_preparation_stack_ids: el.sample_preparation_stack_parent.map(
                (el) => el.id,
            ),
            sample_preparation_price: el.analysis_data?.sample_preparation_price,
        });
    }
    //-------------------

    //Making stack data null except one
    //-------------------
    for (let i = 0; i < analysis_payment_info.length; i++) {
        const analysis = analysis_payment_info[i];
        for (let j = i + 1; j < analysis_payment_info.length; j++) {
            const analysis_2 = analysis_payment_info[j];
            if (analysis.sampling_name == analysis_2.sampling_name) {
                analysis_2.sampling_price = 0;
            }
            if (analysis.sample_preparation_stack_ids.includes(analysis_2.id)) {
                analysis_2.sample_preparation_price = 0;
            }
        }
    }
    //-------------------

    const sample_preparations = analysis_payment_info
        .map((el) => ({
            price: el.sample_preparation_price,
            id: el.id,
        }))
        .filter((el) => el.price != 0);

    const samplings = analysis_payment_info
        .map((el) => {
            return {
                price: el.sampling_price,
                id: el.id,
            };
        })
        .filter((el) => el.price != 0);
    return {
        analysis_payment_info,
        samplings: samplings,
        sample_preparations: sample_preparations,
    };
}