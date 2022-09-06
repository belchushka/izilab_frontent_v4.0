import React, {useEffect, useRef, useState} from 'react';
import s from "./style.module.scss"
import {Loader, useLoading} from "@box/shared";

interface IPaymentForm {
    confirmation_token: string | null,
    onRender: ()=>void
}

const PaymentFormNowrap: React.FC<IPaymentForm> = ({confirmation_token, onRender}) => {
    const rendered = useRef(false)
    const {loading, startLoading, stopLoading} = useLoading()
    useEffect(() => {
        startLoading()

        if (confirmation_token !== null && !rendered.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const checkout = new window.YooMoneyCheckoutWidget({
                confirmation_token: confirmation_token,
                customization: {
                    //Настройка цветовой схемы, минимум один параметр, значения цветов в HEX
                    colors: {
                        //Цвет акцентных элементов: кнопка Заплатить, выбранные переключатели, опции и текстовые поля
                        control_primary: '#0187FC', //Значение цвета в HEX
                        control_primary_content: '#FFFFFF'
                    }
                },
                error_callback: function (error: any) {
                    console.log(error)
                },
            });

            //Отображение платежной формы в контейнере
            checkout.render('payment-form').then(()=>{
                onRender()
                stopLoading()
            })
            rendered.current = true
        }
    }, [confirmation_token])
    return (
        <div className={s.payment} id={"payment-form"}>
            {loading &&             <Loader/>
            }
        </div>
    );
};

export const PaymentForm = React.memo(PaymentFormNowrap)