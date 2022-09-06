import {useTypedSelector} from "@box/app/store/hooks";
import {getTotalPrice} from "@box/entities";
import {Button} from "@box/shared";
import React, {useCallback, useContext} from "react";
import {OrderNavigationContext} from "@box/contexts";

interface IPriceButton {
    onClick: () => void,
    width?: number | string
}

export const PriceButton: React.FC<IPriceButton> = ({onClick, width = "auto"}) => {
    const {goTo} = useContext(OrderNavigationContext)
    const ids = useTypedSelector(state => state.cart.ids)
    const price = useTypedSelector(getTotalPrice)
    const clickHandler = useCallback(()=>{
        if (ids.length > 0){
            goTo(1)
        }else{
            onClick()
        }
    }, [ids.length, goTo])
    return <Button onClick={clickHandler} width={width} type={"order"}>
        {ids.length > 0 ? <span>Перейти в корзину ({ids.length}) {price} ₽</span> :
            <span>Записаться онлайн</span>}

    </Button>;
}