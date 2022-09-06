import React, {useMemo} from 'react';
import {ButtonInput} from "@box/shared";
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {applyPromo, setCurrentPromo, setPromo} from "@box/entities";
import s from "./style.module.scss"

interface IPromocodeInput {
    className?: string
}

export const PromocodeInput: React.FC<IPromocodeInput> = ({className}) => {
    const {current_promo, promocode} = useTypedSelector(state=>state.promocode)
    const dispatch = useTypedDispatch()
    const onInput = (val: string)=>{
        dispatch(setCurrentPromo(val))
    }
    const onButtonClick = async ()=>{
        if (current_promo.trim().length>0){
            try {
               await dispatch(applyPromo(current_promo))
            }catch (e) {
                alert("Промокод неактивен")
            }
        }
    }
    const onButtonActiveClick = ()=>{
        dispatch(setPromo(null))
        dispatch(setCurrentPromo(""))

    }

    const promocodeText = useMemo<string>(()=>{
        if (promocode?.discount_percent){
            return `Скидка по промокоду ${promocode.discount_percent*100}%`
        }else if(promocode?.discount_amount){
            return `Скидка по промокоду ${promocode.discount_amount}  ₽`
        }
        return ""
    },[promocode])
    return (
        <div className={`${s.body} ${className}`}>
            <ButtonInput buttonActive={promocode!==null} inputDisabled={promocode!=null} buttonActiveText={"Отменить"} buttonText={"Применить"} onButtonActiveClick={onButtonActiveClick} onClick={onButtonClick} placeholder={"Введите промокод"} onInput={onInput} value={current_promo}/>
            {promocode !== null && <p>{promocodeText}</p>}
        </div>
    );
};

