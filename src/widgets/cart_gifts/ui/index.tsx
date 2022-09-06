import React, {useEffect} from 'react';
import s from "./style.module.scss";
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {getGifts} from "@box/entities";
import GiftCard from "@box/entities/analysis/ui/gift_card";

interface ICartGifts {
    className?: string
}

const CartGiftsNowrap: React.FC<ICartGifts> = ({
    className=""
                                               }) => {
    const gifts = useTypedSelector(state=>state.analysis.gifts)
    const dispatch = useTypedDispatch()
    useEffect(()=>{
        dispatch(getGifts())
    },[])
    return (
        <div className={`${s.gifts} ${className}`}>
            {gifts?.map((el: any) => {
                return <GiftCard className={s.gift} key={el.id} data={el}/>
            })}
        </div>
    );
};

export const CartGifts = React.memo(CartGiftsNowrap)