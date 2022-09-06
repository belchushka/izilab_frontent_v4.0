import React, {MouseEventHandler, useEffect, useMemo, useState} from 'react';
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {AnalysisCard, getFromCategory, searchAnalysis, setCategory} from "@box/entities";
import {categories, ComponentAnimateWrapper, EmptyBlock, Loader, useLoading, useSearch} from "@box/shared";
import s from "./style.module.scss"
import {check_card_type} from "@box/entities/analysis/ui/lib/check_card_type";
import EmptySearch from "@assets/images/empty_search.png"

const AnalysisListNowrap = () => {
    const {loading, startLoading, stopLoading} = useLoading()
    const city = useTypedSelector(state => state.city.city)
    const [page, setPage] = useState<number>(0)
    const {
        category: selected_category,
        analysis_list: analysis,
        pages_left,
        total,
    } = useTypedSelector(state => state.analysis)
    const {search, searchActive} = useSearch()
    const dispatch = useTypedDispatch()
    const loadMore = () => {
        setPage(state => state + 1)
    }
    useEffect(() => {
        if (page !== 0) {
            if (searchActive){
                dispatch(searchAnalysis(search, page))
            }else{
                dispatch(getFromCategory(selected_category?.category_name, page))
            }
        }
    }, [page, searchActive,search])

    const fetchData = async () => {
        try {
            startLoading()
            await dispatch(getFromCategory(selected_category?.category_name, 0))
            setTimeout(() => {
                stopLoading()
            }, 200)
            setPage(0)
        } catch (e) {
        }
    }

    const searchData = async ()=>{
        try {
            startLoading()
            await dispatch(searchAnalysis(search, 0))
            setTimeout(() => {
                stopLoading()
            }, 200)
            setPage(0)
        } catch (e) {
        }
    }

    useEffect(() => {
        if (searchActive){
            searchData()
        }else{
            fetchData()
        }
    }, [selected_category?.category_name, searchActive,search])

    const emptyBlockClick: MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(setCategory(categories[0]))
    }

    return (
        <div>
            {loading ?
                <Loader/>
                :
                <>
                    {searchActive && <p className={s.totalFound}>Всего найдено: {total}</p>}
                    <ComponentAnimateWrapper condition={analysis.length>0}>
                        <div className={s.analysis_list}>
                            {analysis.map((el) => {
                                const analysis: any = check_card_type(el, city?.utc)
                                return <AnalysisCard key={el.id} type={analysis.type}
                                                     data={analysis.analysis}
                                                     className={s.analysis_list_card}/>
                            })}

                        </div>
                        {pages_left > 0 && <div onClick={loadMore}>
                            <p className={s.analysis_list_show_more}>Посмотреть еще</p>
                        </div>}
                    </ComponentAnimateWrapper>
                    {analysis.length > 0 ?
                        <>

                        </>
                        :
                        <EmptyBlock subtitle={"В данный момент проводится обновление каталога анализов. Если вы не нашли анализ, пожалуйста, свяжитесь с нами по ссылке ниже"} img={EmptySearch} onButtonClick={emptyBlockClick}/>
                    }
                </>
            }
        </div>
    );
};

export const AnalysisList = React.memo(AnalysisListNowrap)