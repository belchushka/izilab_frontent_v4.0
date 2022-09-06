import React, {useMemo} from 'react';
import s from  "./style.module.scss"
import {addGift, getTotalPrice, IAnalysis, removeGift} from "@box/entities";
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {Button} from "@box/shared";

interface IGiftCard {
    data: IAnalysis,
    className?: string
}

const GiftCard: React.FC<IGiftCard> = ({data, className=""}) => {
    const dispatch = useTypedDispatch()
    const {gifts:cart_gifts, analysis} = useTypedSelector(state=>state.cart)
    const total_price = useTypedSelector(getTotalPrice)
    const in_cart = useMemo(()=>{
        return cart_gifts.includes(data.id)
    }, [data.id, cart_gifts])
    const in_cart_analysis = useMemo(()=>{
        return analysis.some(el=>el.id == data.id)
    }, [data.id, analysis])
    const disabled = useMemo(()=>{
        return (cart_gifts.length>0 && !in_cart) || total_price<5000
    }, [cart_gifts, in_cart, total_price])
    const clickHandler = ()=>{
        if (!in_cart_analysis){
            if (in_cart){
                dispatch(removeGift(data.id))
                return
            }
            dispatch(addGift(data.id))
        }
    }
    return (
        <div className={`${s.gift_body} ${disabled && s.gift_body_disabled} ${(in_cart || in_cart_analysis) && s.gift_body_in_cart} ${className}`}>
            <div className={s.gift_body_content}>
                <p>{data.analysis_data?.name || ""}</p>
                <Button width={150} className={s.gift_body_content_button} type={"cart"} color={"pink"} onClick={clickHandler}>
                    {!in_cart_analysis ? <p>{in_cart ? "Удалить":"Выбрать"}</p> : <p>В корзине</p>}
                </Button>
            </div>
        </div>
    );
};

export default GiftCard;