import React, {MouseEventHandler, useContext, useMemo} from 'react';
import s from "./style.module.scss"
import {Modal, Button, declOfNum} from "@box/shared";
import {ModalContext} from "@box/contexts";
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {addAnalysis, removeAnalysis} from "@box/entities";
import {ComplexInner} from "../components/complex_inner";
import {count_stock_endtime} from "@box/entities/analysis/ui/lib/count_stock_endtime";
import File from "@assets/icons/file.svg"


interface IAnalysisModal {
    zIndex: number,
    showBottom?: boolean,
    toggle_cart?: MouseEventHandler<HTMLButtonElement>,
    type?: "default" | "cart",
    is_inner?: boolean
}

const AnalysisModalNowrap: React.FC<IAnalysisModal> = ({zIndex, showBottom=true, toggle_cart,type="default", is_inner=false}) => {
    const {hideAnalysisModal, hideAnalysisCompoundModal} = useContext(ModalContext)
    const cart = useTypedSelector(state=>state.cart)
    const {analysis, analysis_compound} = useTypedSelector(state=>state.analysis)
    const data = useMemo(()=>{
        if (is_inner){
            return analysis_compound
        }
        return analysis
    },[is_inner])
    const stock_endtime = useMemo(() => {
        if (data){
            return count_stock_endtime("stock", data.analysis_data?.stock_until ?? null)
        }
        return 0
    }, [data])
    const dispatch = useTypedDispatch()
    const inCart: boolean = useMemo(()=>{
        if (data){
            return cart.ids.includes(data.id)
        }
        return false
    }, [cart.ids])

    const onAddClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()
        if(data){
            if (inCart) {
                dispatch(removeAnalysis(data.id))
            } else {
                dispatch(addAnalysis(data))
            }
        }
    }
    const handleClose = (type = null)=>{
        if (is_inner){
            hideAnalysisCompoundModal()
            if (type=="outer"){
                hideAnalysisModal()

            }
            return
        }else{
            hideAnalysisModal()
        }
    }

    if (!data){
        return null
    }
    return (
        <Modal zIndex={zIndex} hide={handleClose} className={s.modal_body}>
            <h5 className={s.modal_body_title}>{data.analysis_data.name}</h5>
            <p className={s.modal_body_code}>Артикул: {data.code}</p>

            <div className={`${s.modal_body_compound} custom_scroll ${!data.is_complex && s.modal_body_description_block}`}>
                {data.is_complex ?
                    <>
                        {
                            data.complex_compound.length > 0 && <>
                                <p className={s.modal_body_section_title}>
                                    Состав:
                                </p>
                                <div className={s.modal_body_compound_list}>
                                    {data.complex_compound.map((el:any)=>{
                                        return <ComplexInner key={el.analysis_data.name} data={el} className={s.modal_body_section_title}/>
                                    })}

                                </div>
                            </>
                        }
                    </>
                    :
                    <>
                        {data.analysis_data.description && <p className={s.modal_body_section_title}>{data.analysis_data.description}</p>}
                        {data.analysis_data.preparation &&
                            <>
                                <p className={`${s.modal_body_section_title} ${s.modal_body_section_title_description}`}>Подготовка к исследованию</p>
                                <p className={s.modal_body_section_title}>
                                    {data.analysis_data.preparation}
                                </p>
                            </>
                        }
                        {data.analysis_data.prescribing &&
                            <>
                                <p className={`${s.modal_body_section_title} ${s.modal_body_section_title_description}`}>Показания к назначению</p>
                                <p className={s.modal_body_section_title}>
                                    {data.analysis_data.prescribing}
                                </p>
                            </>
                        }

                    </>

                }

            </div>

            {/*{!data.is_complex &&*/}
            {/*    // <p className={s.modal_body_section_title}>{data.analysis_data.preparation}</p>*/}
            {/*}*/}
            {
                data.analysis_data.additional_conditions!=="нет" && <div className={s.alert_body}>
                    <p className={s.alert}>{data.analysis_data.additional_conditions}</p>
                </div>
            }


            <div className={s.modal_body_info}>
                    <div className="">
                        <p className={`${s.modal_body_section_title} ${s.bottom_info_title}`}>
                            Биоматериал:
                        </p>
                        <p className={s.modal_body_section_title}>
                            {data.analysis_data.biomaterial}
                        </p>
                    </div>

                    <div className="">
                        <p className={`${s.modal_body_section_title} ${s.bottom_info_title}`}>
                            Срок готовности:
                        </p>
                        <p className={s.modal_body_section_title}>
                            До {data.analysis_data.execution_period} {declOfNum(data.analysis_data.execution_period, ['дня', 'дней', 'дней'])}
                        </p>
                    </div>

                {/*{*/}
                {/*    analysis?.analysis_data.example_result_link &&*/}
                {/*    <div className={s.download_example}>*/}
                {/*        <img src={File} alt=""/>*/}
                {/*        <a href={analysis?.analysis_data.example_result_link} target="_blank" rel="noopener noreferrer" className={s.modal_body_section_title}>Скачать примеры*/}
                {/*            <br/>*/}
                {/*            результатов анализов</a>*/}
                {/*    </div>*/}
                {/*}*/}

            </div>
            {
                (data.analysis_data.announcement) && <div className={s.piece_alert_body}>
                    <p className={s.piece_alert}>{data.analysis_data.announcement}</p>
                </div>
            }
            {showBottom &&
                <div className={`${s.modal_body_button} ${type=="cart" && s.modal_body_button_cart} ${data.analysis_data.announcement && s.anounsment_btn}`}>
                    {type == "default" &&
                        <>
                            <Button type={"order"} onClick={onAddClickHandler} className={`${inCart ? s.modal_body_button_center : s.modal_body_button_between}`}>
                                <p>{inCart ? "Удалить из корзины": "Заказать"}</p>
                                <p>{!inCart &&
                                    <>
                                        <span className={s.modal_body_button_stock_price}>{(data.analysis_data.has_stock && data.analysis_data.price !== data.analysis_data.prev_stock_price) && `${data.analysis_data.prev_stock_price} ₽`}</span>
                                        {data.analysis_data.price} ₽
                                    </>
                                }
                                </p>
                            </Button>
                            {(data.analysis_data.has_stock && stock_endtime!=0) && <p className={s.modal_body_button_stock}>до конца акции осталось {stock_endtime}</p>}
                        </>
                    }
                    {type == "cart" &&
                        <>
                            <p>{data.analysis_data.price} ₽</p>
                            <Button onClick={onAddClickHandler} type={"order"}>
                                <p>Удалить</p>
                            </Button>
                        </>
                    }
                </div>
            }

        </Modal>




    );
};

export const AnalysisModal = React.memo(AnalysisModalNowrap);