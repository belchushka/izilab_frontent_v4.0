import React, {useMemo} from 'react';
import {useTypedSelector} from "@box/app/store/hooks";
import s from "./style.module.scss"
import {AnalysisCartCard, IAnalysis} from "@box/entities";
import {check_card_type} from "@box/entities/analysis/ui/lib/check_card_type";
import {SamplingCard} from "@box/widgets/cart_analysis";

export const CartAnalysis = () => {
    const {analysis, samplings, sample_preparations} = useTypedSelector(state => state.cart)
    const city = useTypedSelector(state => state.city.city)
    const office_id = useTypedSelector(state=> state.cart.office_id)
    const sortedAnalysis = useMemo(()=>{
        const copy = [...analysis]
        copy.sort((x,y)=>{
            return (x.is_complex == y.is_complex) ? 0 : x.is_complex ? -1 : 1
        })
        return copy
    }, [analysis])
    return (
        <div className={`${s.analysis_list} custom_scroll`}>
            {sortedAnalysis?.map((el: IAnalysis) => {
                const analysis: any = check_card_type(el, city?.utc)
                return <div key={el.id}
                            className={`${el.only_in_complex_with_parent.length > 0 && s.analysis_wrapper}`}>
                    <AnalysisCartCard selectOffice={() => null}
                                      notPerformed={el.not_performed_in_offices.some(el=>el.office_id == office_id)}
                                      type={analysis.type}
                                      data={analysis.analysis}
                                      className={s.analysis}/>
                    {el.only_in_complex_with_parent?.map((child: IAnalysis) => {
                        const analysis_child: any = check_card_type(child, city?.utc)
                        return <AnalysisCartCard selectOffice={()=>null}
                                                 notPerformed={false}
                                                 showButton={false} key={child.id}
                                                 type={analysis_child.type}
                                                 data={analysis_child.analysis}
                                                 className={s.analysis}/>
                    })}
                </div>
            })}
            {samplings.map((el: any) => {
                return <SamplingCard key={el.id} title={"Взятие биоматериала"}
                                     price={el.price}/>
            })}

            {sample_preparations.map((el: any) => {
                return <SamplingCard key={el.id} title={"Пробоподготовка"} price={el.price}/>

            })}
        </div>
    );
};

