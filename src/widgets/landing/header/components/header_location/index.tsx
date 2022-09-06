import React, {useContext, useEffect, useState} from 'react';
import MapPointer from "@assets/icons/map_pointer.svg"
import NavigatorIcon from "@assets/icons/nvigation_arrow.svg"
import LocationTriangle from "@assets/icons/location_triangle.svg"
import s from "./style.module.scss"
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {ModalContext} from "@box/contexts";
import {setCitySuggestion, setCurrentCity} from "@box/entities";


export const HeaderLocation: React.FC = () => {
    const {city, suggested_city} = useTypedSelector(state=>state.city)
    const {showCitySelectModal} = useContext(ModalContext)
    const dispatch = useTypedDispatch()
    const submitHandler = ()=>{
        dispatch(setCurrentCity(suggested_city.name))
        dispatch(setCitySuggestion({
            id: null,
            name: null
        }))
    }
    console.log(suggested_city);
    return (
        <>
            <div className={s.location_wrapper}>
                <div className={s.location_info}>
                    <img src={MapPointer} alt=""/>
                    <p onClick={showCitySelectModal} className={s.location_info_city} >
                        {city.name ? city.name : "Не определено"}
                    </p>
                </div>
                {(suggested_city.id!=null) && <div className={s.location_confirm_wrapper}>
                    <div className={s.location_confirm_triangle}>
                        <img src={LocationTriangle} alt=""/>
                    </div>
                    <div className={s.location_confirm}>
                        <div className={s.location_confirm_text_wrapper}>
                            <img src={NavigatorIcon} alt=""/>
                            <p className={s.location_confirm_text_wrapper_text}>Ваш город <span>{suggested_city.name}</span>?</p>
                        </div>
                        <div className={s.location_confirm_buttons}>
                            <button onClick={submitHandler} className={s.location_confirm_buttons_button}>Все верно</button>
                            <button onClick={showCitySelectModal} className={s.location_confirm_buttons_button}>Выбрать город</button>
                        </div>
                    </div>
                </div>}


            </div>
        </>

    );
};
