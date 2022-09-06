import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {OrderNavigationContext} from "@box/contexts";
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {$host} from "@box/app/http";
import {clearCart, setCurrentPromo, setPromo} from "@box/entities";
import s from "./style.module.scss"
import {PaymentForm} from "@box/features";
import {Button, ComponentAnimateWrapper} from "@box/shared";
import PaymentStatusModal from "@box/shared/ui/payment_status_modal/ui";

export const Payment = () => {
    const {goBack, goTo} = useContext(OrderNavigationContext)
    const {ids, office_id, gifts, date} = useTypedSelector(state => state.cart)
    const {user, parent} = useTypedSelector(state=>state.user)
    const promocode = useTypedSelector(state=>state.promocode.promocode)
    const [paymentToken, setPaymentToken] = useState<string | null>(null)
    const [paymentStatus, setPaymentStatus] = useState<string | null>('pending')
    const [transactionKey, setTransactionKey] = useState(null)
    const dispatch = useTypedDispatch()
    const checkInterval = useRef<any>(null)
    const payment_id = useRef(null)

    const create_payment = async () => {
        try {
            const data = {
                cart: ids,
                gifts: gifts,
                officeId: office_id,
                receipt: {},
                user: user,
                parent: parent.name.length>0 ? parent : null,
                date: date,
                promocode_id: promocode ? promocode.id : null
            }
            const payment_data: any = await $host.post('transaction/create', data)
            setTransactionKey(payment_data.data.transaction.key)
            setPaymentToken(payment_data.data.confirmation.confirmation_token)
            payment_id.current = payment_data.data.id

        } catch (e) {
            console.log(e);
            setPaymentStatus("error")
        }
    }

    useEffect(() => {
        create_payment()
    }, [])

    const onFormRender =useCallback(() => {
            checkInterval.current = setInterval(async () => {
                const {data} = await $host.get('transaction/status/'+transactionKey)
                const status = data.status
                setPaymentStatus(status)
                if (status=="succeeded"){
                    // @ts-ignore
                    window.ym(88215499,'reachGoal','success_payment')
                }
                if (status == "canceled" || status=="succeeded") {
                    clearInterval(checkInterval.current)
                }
            }, 5000)
        }, [transactionKey])
    useEffect(()=>{
        return ()=>{
            if (checkInterval.current){
                clearInterval(checkInterval.current)
            }
        }
    },[])

    const successHandler = () => {
        dispatch(clearCart())
        dispatch(setCurrentPromo(""))
        dispatch(setPromo(null))
        setPaymentStatus(null)
        goTo(0)
    }

    const errorHandler = ()=>{
        setPaymentStatus(null)
        goBack()
    }
    return (
        <div>
            <ComponentAnimateWrapper zIndex={1005} condition={paymentStatus == "succeeded" }>
                <PaymentStatusModal type={'success'} onClick={successHandler}/>
            </ComponentAnimateWrapper>
            <ComponentAnimateWrapper zIndex={1005} condition={paymentStatus == "error" }>
                <PaymentStatusModal type={'error'} onClick={errorHandler}/>
            </ComponentAnimateWrapper>
            <PaymentForm onRender={onFormRender} confirmation_token={paymentToken}/>
            <div className={s.button}>
                <Button onClick={goBack} type={'order'}>
                    <p>Отмена</p>
                </Button>
            </div>
        </div>
    );
};

