import React, {MouseEventHandler, useContext, useMemo, useRef, useState} from 'react';
import s from "./style.module.scss"
import Done from "@assets/icons/done.svg"
import {addAnalysis, IAnalysis, removeAnalysis, setAnalysis} from "@box/entities";
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {declOfNum} from "@box/shared";
import {count_stock_endtime} from "@box/entities/analysis/ui/lib/count_stock_endtime";
import {ModalContext} from "@box/contexts";


interface IAnalysisCard {
    className?: string,
    data: IAnalysis,
    type: "stock" | "default"
}

const AnalysisCardNowrap: React.FC<IAnalysisCard> = ({className, data, type = "default"}) => {
    const addAnimationRef = useRef<HTMLDivElement>(null)
    const cart = useTypedSelector(state => state.cart)
    const dispatch = useTypedDispatch()
    const {showAnalysisModal} = useContext(ModalContext)
    const stockEndtime = useMemo(() => {
        return count_stock_endtime(type, data.analysis_data?.stock_until ?? null)
    }, [])

    const inCart: boolean = useMemo(()=>{
        return cart.ids.includes(data.id)
    }, [cart.ids])

    const onAddClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()
        if (inCart) {
            dispatch(removeAnalysis(data.id))
        } else {
            dispatch(addAnalysis(data))
            if (addAnimationRef.current != null) {
                addAnimationRef.current.classList.add(s.animated_transaction)
                setTimeout(() => {
                    if (addAnimationRef.current){
                        addAnimationRef.current.classList.remove(s.animated_transaction)
                    }
                }, 800)
            }
        }
    }

    const cardClickHandler = ()=>{
        dispatch(setAnalysis(data))
        showAnalysisModal()
    }
    return (
        <>
            <div onClick={cardClickHandler} className={`${className} ${s.card} ${type == "stock" && s.card_stock}`} style={{
                background: type == "stock" ? `linear-gradient(90deg, #${data.analysis_data?.gradient_1} 0%, #${data.analysis_data?.gradient_2} 100%)` : "#E8F4FF"
            }}>
                <div ref={addAnimationRef} className={s.add_transition}>
                    <img src={Done} alt=""/>
                </div>
                {type == "default" && <>
                    <div className={s.right_side}>
                        <h6 className={s.right_side_title}>{data.analysis_data?.name}</h6>
                        <p className={s.right_side_description}>{data.analysis_data?.description}</p>
                    </div>
                    <div className={s.left_side}>
                        <div className={s.left_side_text}>
                            <p>{data.analysis_data?.price} ₽</p>
                            <span>до {data.analysis_data?.execution_period} {declOfNum(data.analysis_data?.execution_period as number, ['дня', 'дней', 'дней'])}</span>
                        </div>
                        <button onClickCapture={onAddClickHandler}
                                className={`${s.left_side_add_btn} ${inCart && s.left_side_add_btn_active}`}></button>
                    </div>
                </>}

                {type == "stock" &&
                    <>
                        <div className={s.card_stock_content}>
                            <h6 className={s.right_side_title}>{data.analysis_data?.name}</h6>
                            <div className={`${s.left_side_text} ${s.left_side_text_stock}`}>
                                <div className="">
                                    <button onClickCapture={onAddClickHandler}
                                            className={`${s.left_side_add_btn} ${inCart && s.left_side_add_btn_active}`}></button>

                                    <p><span>{data.analysis_data?.prev_stock_price}</span> {data.analysis_data?.price} ₽
                                    </p>

                                </div>
                                <span>до конца акции осталось {stockEndtime}</span>
                            </div>
                        </div>
                        <div className={s.card_stock_bg_image}>
                            <img src={data.analysis_data?.stock_image_link as string} alt=""/>
                        </div>
                    </>
                }
            </div>
        </>

    );
};

export const AnalysisCard = React.memo(AnalysisCardNowrap);

