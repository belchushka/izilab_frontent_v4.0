import React, {useContext} from 'react';
import {AnalysisList, CategorySlider} from "@box/widgets";
import GiftProgress from "@box/shared/ui/gift_progress";
import {AnimateWrapper, ComponentAnimateWrapper, PriceButton, useSearch} from "@box/shared";
import {useTypedSelector} from "@box/app/store/hooks";
import s from "./style.module.scss"
import {OrderNavigationContext} from "@box/contexts";
import {SupportModalText} from "@box/shared/ui/support_modal_text";
import {Search} from "@box/features";

export const Analysis = () => {
    const cart = useTypedSelector(state => state.cart)
    const analysis = useTypedSelector(state => state.analysis.analysis_list)
    const {goNext} = useContext(OrderNavigationContext)
    const {searchActive} = useSearch()
    return (
        <AnimateWrapper>
            <Search containerClassName={s.search_input} className={s.search_input_inner}/>
            <ComponentAnimateWrapper condition={!searchActive}>
                <CategorySlider/>
            </ComponentAnimateWrapper>
            <AnalysisList/>
            {analysis.length>0 &&
                <>
                    <GiftProgress/>
                    <ComponentAnimateWrapper condition={cart.ids.length > 0}>
                        <div className={s.next_step}>
                            <PriceButton onClick={goNext}/>
                        </div>
                    </ComponentAnimateWrapper>
                    <SupportModalText/>
                </>
            }
        </AnimateWrapper>
    );
};

