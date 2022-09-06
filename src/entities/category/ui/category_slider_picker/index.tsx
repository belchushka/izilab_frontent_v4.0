import React from 'react';
import s from "./style.module.scss"
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {setCategory} from "@box/entities/analysis/model";

interface ICategorySliderPicker {
    id:number,
    icon: string
    text: string
    category_name:string
}

const CategorySliderPickerNowrap: React.FC<ICategorySliderPicker> = ({id,icon,text, category_name}) => {
    const dispatch = useTypedDispatch()
    const selected_category = useTypedSelector(state=>state.analysis.category)
    const onClickHandler = ()=>{
        if (id !== selected_category?.id){
            dispatch(setCategory({
                id,
                icon,
                text,
                category_name
            }))
        }
    }
    return (
        <div onClick={onClickHandler} className={`${s.category_body} ${id==selected_category?.id && s.category_body_selected}`}>
            <div className={`${s.category_content}`}>
                <img src={icon} alt=""/>
                <span><span className={s.category_content_dot}>•</span>{text}</span>
            </div>

        </div>
    );
};

export const CategorySliderPicker = React.memo(CategorySliderPickerNowrap)
