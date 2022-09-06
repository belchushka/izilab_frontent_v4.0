import React from 'react';
import s from "./style.module.scss"
import PaymentError from "@assets/images/payment_error.png"
import PaymentSuccess from "@assets/images/payment_success.png"
import {useTypedSelector} from "@box/app/store/hooks";
import {Button, Modal} from "@box/shared";


interface IPaymentStatusModal {
    type: "error" | "success",
    onClick: ()=>void,
}

const PaymentStatusModal: React.FC<IPaymentStatusModal> = ({type, onClick}) => {
    const email = useTypedSelector(state=>state.user.user.email)
    return (
        <Modal className={s.modal_body} zIndex={10000} hide={() => null} showCross={false}>
            <img src={type=="error" ? PaymentError : PaymentSuccess} alt=""/>
            <h4>{type=="error" ? 'Ошибка при оплате!' : 'Успешная оплата!'}</h4>
            <p>
                {type=="error" ? 'Похоже, это был технический сбой — попробуйте ещё\n' +
                    '                раз, пожалуйста. В случае повтора ошибки попробуйте\n' +
                    '                обратиться в банк, выпустивший вашу карту,\n' +
                    '                либо сменить способ оплаты.' : `На ваш e-mail ${email} отправлено направление в партнерский медофис.\n` +
                    '\n' +
                    'Пожалуйста, ознакомьтесь \n' +
                    'с инструкцией в направлении.'}
            </p>
            <Button onClick={onClick} width={220} className={s.button} type={'order'}>
                <p>{type=="error" ? 'Вернуться к оплате' : 'Вернуться на сайт'}</p>
            </Button>
        </Modal>
    );
};

export default PaymentStatusModal;