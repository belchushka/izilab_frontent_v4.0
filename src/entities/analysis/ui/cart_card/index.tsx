import React, {MouseEventHandler, useContext, useState} from 'react';
import s from "../card/style.module.scss"
import s_upd from './style.module.scss'
import Sign from "@assets/icons/alert_sign.svg"
import {useTypedDispatch} from "@box/app/store/hooks";
import {removeAnalysis, setAnalysis} from "@box/entities";
import {Button} from "@box/shared";
import {ModalContext} from "@box/contexts";


interface IAnalysisCard {
    className?: string,
    data: any,
    type: "stock" | "default",
    showButton?: boolean,
    notPerformed: boolean,
    selectOffice: ()=>void
}

const AnalysisCartCardNowrap: React.FC<IAnalysisCard> = ({className, data, type = "default", showButton=true, notPerformed, selectOffice}) => {
    const dispatch = useTypedDispatch()
    const {showAnalysisModal, showOfficeSelectModal} = useContext(ModalContext)
    const onAddClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()
        dispatch(removeAnalysis(data.id))
    }
    const cardClickHandler = ()=>{
        dispatch(setAnalysis(data))
        showAnalysisModal()
    }
    const handleSelectOffice: MouseEventHandler<HTMLButtonElement> = (ev)=>{
        ev.stopPropagation()
        showOfficeSelectModal()
    }
    return (
        <>
            <div onClick={cardClickHandler}>
                <div className={`${className} ${s.card} ${s_upd.card} ${type == "stock" && s_upd.card_stock} ${notPerformed && s_upd.not_performed} ${(notPerformed && type=="stock") && s_upd.not_performed_pink} ${(notPerformed && type=="default") && s_upd.not_performed_blue}`} style={{}}>
                    <div className={s.right_side}>
                        <h6 className={s.right_side_title}>{data.analysis_data.name}</h6>
                        <p className={s.right_side_description}>Подробнее об услуге</p>
                    </div>
                    <div className={s.left_side}>
                        <div className={s.left_side_text}>
                            {type == 'stock'?
                                <p><span>{data.analysis_data.prev_stock_price}</span> {data.analysis_data.price} ₽</p> :
                                <p>{data.analysis_data.price} ₽</p>}
                            <span>до {data.analysis_data.execution_period} дней</span>
                        </div>
                        {(showButton && !notPerformed) && <Button type={"cart"} color={type=="stock" ? "pink" : "blue"} onClick={onAddClickHandler}>
                            <p>Удалить</p>
                        </Button>}

                    </div>


                </div>

                {notPerformed && <div className={`${s_upd.not_performed_alert} ${type=="stock" ? s_upd.not_performed_alert_pink : s_upd.not_performed_alert_blue}`}>
                    <div className={s_upd.not_performed_alert_dialog}>
                        <img src={Sign} alt=""/>
                        <p>Данный анализ нельзя выполнить <br/>
                            в этом медофисе</p>
                    </div>
                    <div className={s_upd.not_performed_alert_buttons}>
                        <Button type={"cart"} color={type=="stock" ? "pink" : "blue"} onClick={handleSelectOffice}>
                            <p>Выбрать другой медофис</p>
                        </Button>
                        <Button type={"cart"} color={type=="stock" ? "pink" : "blue"} onClick={onAddClickHandler}>
                            <p>Удалить</p>
                        </Button>
                    </div>
                </div>}
            </div>

        </>

    );
};

export const AnalysisCartCard = React.memo(AnalysisCartCardNowrap)