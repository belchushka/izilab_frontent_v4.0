import {IAnalysis} from "@box/entities";
import {count_stacks} from "@box/shared/lib/count_stacks";

export function count_cart_price(analysis: Array<IAnalysis>, utc: number | null){
    const { analysis_payment_info, sample_preparations, samplings } =
        count_stacks(analysis, utc); //Data which represents total cart prise

    let total_price = 0;
    let price_without_stock = 0;
    let sampling_price = 0;
    let sample_preparation_price = 0;
    for (const el of analysis_payment_info) {
        total_price += el.current_price;
        price_without_stock += el.price_before_stock;
        sampling_price += el.sampling_price || 0;
        sample_preparation_price += el.sample_preparation_price || 0;
    }

    return {
        total_price: total_price,
        price_without_stock: price_without_stock,
        sample_preparations: sample_preparations,
        samplings: samplings,
        sampling_price: sampling_price,
        sample_preparation_price: sample_preparation_price,
    };
}