import React, {useMemo} from 'react';
import s from "./style.module.scss"
import {useTypedSelector} from "@box/app/store/hooks";
import {getCartGift, getTotalPrice} from "@box/entities";

export const CartSumUp = () => {
    const {analysis, total_price, price_without_stock, gifts, samplings, sample_preparations, sample_preparation_price, sampling_price} = useTypedSelector(state=>state.cart)
    const promocode = useTypedSelector(state=>state.promocode.promocode)
    const cart_total_price = useTypedSelector(getTotalPrice)
    const cart_gift = useTypedSelector(getCartGift)
    return (
        <div className={`${s.order_details}`}>
            <h4>Ваш заказ</h4>
            <div className={s.order_details_list}>
                <div className={s.order_details_list_inner}>
                    <p>Анализы ({analysis.length})</p>
                    <p>{total_price} ₽</p>
                </div>
                {
                    (price_without_stock-total_price > 0 || promocode || gifts.length>0) && <div className={s.order_details_list_inner}>
                        <p>Скидка</p>
                        <p className={s.order_details_list_inner_stock}>{price_without_stock + sampling_price + sample_preparation_price-cart_total_price+(cart_gift?.analysis_data.price || 0)} ₽</p>
                    </div>
                }

                <div className={s.order_details_list_inner}>
                    <p>Взятие биоматериала ({samplings.length})</p>
                    <p>{sampling_price} ₽</p>
                </div>
                {sample_preparations.length > 0 &&
                    <div className={s.order_details_list_inner}>
                        <p>Пробаподготовка ({sample_preparations.length})</p>
                        <p>{sample_preparation_price} ₽</p>
                    </div>
                }
                <div
                    className={`${s.order_details_list_inner} ${s.order_details_list_inner_total}`}>
                    <p>Сумма заказа</p>
                    <div className={s.order_details_list_inner_total_price}>
                        {price_without_stock - total_price > 0 &&
                            <span>{price_without_stock + sampling_price + sample_preparation_price}</span>}
                        <p>{cart_total_price} ₽</p>
                    </div>
                </div>
            </div>

        </div>
    );
};
