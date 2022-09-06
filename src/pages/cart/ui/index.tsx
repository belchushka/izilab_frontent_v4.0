import React, {MouseEventHandler, useContext, useEffect, useMemo} from 'react';
import s from "./style.module.scss"
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {AnimateWrapper, declOfNum, EmptyBlock} from "@box/shared";
import {Button} from "@box/shared";
import EmptyCart from "@assets/images/empty_cart.png"
import {OrderNavigationContext} from "@box/contexts";
import {AnalysisCard, CartSumUp, clearCart, getRecommendations, getTotalPrice} from "@box/entities";
import {CartAnalysis, CartGifts} from "@box/widgets";
import {VisitForm} from "@box/features";

export const Cart = () => {
    const {analysis, alerts, piece_alerts, office_id, date, can_continue, ids} = useTypedSelector(state => state.cart)
    const city = useTypedSelector(state=>state.city.city)
    const totalPrice = useTypedSelector(getTotalPrice)
    const {goBack, goNext} = useContext(OrderNavigationContext)
    const dispatch = useTypedDispatch()
    const clearCartHandler: MouseEventHandler<HTMLParagraphElement> = () => {
        dispatch(clearCart())
    }
    const canGoNext = useMemo(()=>{
        if (date!=null && office_id!=null && city.id!=null && can_continue && !analysis.some(el=>el.not_performed_in_offices.some(el1=>el1.office_id == office_id))){
            return true
        }
        return false
    },[can_continue, date, office_id, city.id, analysis])
    const checkGoNext = ()=>{
        if (canGoNext){
            goNext()
        }
    }
    useEffect(()=>{
        dispatch(getRecommendations(ids))
    }, [ids])
    return (
        <AnimateWrapper>
            <div className={s.cart_wrapper}>
                {analysis.length > 0 ?
                    <div className={s.cart_wrapper_container}>
                        <div className={s.cart_header}>
                            <h3 className={s.cart_header_title}>{analysis.length} {declOfNum(analysis.length, ['товар', 'товара', 'товаров'])} в
                                корзине</h3>
                            <p className={s.cart_header_clear} onClick={clearCartHandler}>очистить корзину</p>
                        </div>
                        <div className={s.cart_sections}>
                            <div className={`${s.cart_sections_section}`}>
                                <CartAnalysis/>
                            </div>
                            <div className={s.cart_sections_section}>
                                <div className={s.cart_sections_section_block}>
                                    {totalPrice >= 5000 ?
                                        <h5 className={s.cart_sections_section_block_title}>Выберите ваш подарок</h5>
                                        :
                                        <p className={s.cart_sections_section_block_title_error}>Добавьте анализы
                                            на {5000 - (totalPrice)} рублей и получите подарок:</p>
                                    }
                                    <CartGifts/>
                                </div>
                                <VisitForm/>
                                <div className={s.alerts}>
                                    {alerts.length > 0 &&    <p >{alerts[0]}</p>}
                                    {/*{alerts?.map(el => {*/}
                                    {/*    return <p key={el}>{el}</p>*/}
                                    {/*})}*/}
                                    {piece_alerts?.map(el => {
                                        return <p key={el}>{el}</p>
                                    })}
                                    {date != null && alerts.length==0 && <p style={{    color: '#0187FC'}}>Прием в порядке живой очереди</p> }
                                </div>
                                <div className={s.cart_sumup}>
                                    <CartSumUp/>
                                </div>
                            </div>

                        </div>


                        <div className={s.buttons}>
                            <Button type={"order"} onClick={goBack}>
                                <span>Вернуться в каталог</span>
                            </Button>
                            <Button disabled={!canGoNext} type={"order"} onClick={checkGoNext}>
                                <span>Перейти к оформлению</span>
                            </Button>
                        </div>

                        {/*<div className={s.recommendations}>*/}
                        {/*    {recommendations.map(el=>{*/}
                        {/*        return <AnalysisCard data={el} type={'default'}/>*/}
                        {/*    })}*/}
                        {/*</div>*/}

                    </div>
                    :
                    <EmptyBlock title={"Ваша корзина пока пуста"} img={EmptyCart} onButtonClick={goBack}/>
                }
            </div>
        </AnimateWrapper>

    );
};

