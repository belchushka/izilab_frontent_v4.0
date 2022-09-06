import React from 'react';
import s from "./style.module.scss"
import {Button, ContainerComponent, declOfNum} from "@box/shared";
import Doctor from "@assets/images/doctor.png"
import {useTypedSelector} from "../../../../app/store/hooks";

export const LandingBanner = () => {
    const offices = useTypedSelector(state=>state.office.offices)
    return (
        <div className={s.banner_container}>
            <ContainerComponent className={s.banner_container_banner_body}>
                <div className={s.banner_container_leftside}>
                    <h3 className={s.banner_container_leftside_title}>
                        Сдать анализы
                        <br/>
                        со скидкой до 60%
                    </h3>
                    <p className={s.banner_container_leftside_subtitle}>
                        {offices.length} {declOfNum(offices.length, ['медофис','медофиса','медофисов'])}  рядом с вами.
                        <br/>
                        Выбирайте любой!
                    </p>
                    <div className={s.banner_container_leftside_buttons}>
                        <a href="#order">
                            <Button type={"landing"} color={"pink"} onClick={()=>null}>
                                <span>Записаться онлайн</span>
                            </Button>
                        </a>
                    </div>
                </div>
                <div className={s.banner_container_rightside}>
                    <img src={Doctor} alt=""/>
                </div>
            </ContainerComponent>
        </div>
    );
};
