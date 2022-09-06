import React, {useContext} from 'react';
import s from "./style.module.scss"
import {Button, ContainerComponent, SocialButton} from "@box/shared";
import Logo from "@assets/images/logo.png"
import BurgerMenu from "@assets/icons/burger_menu.png"
import {DesktopNavigation, HeaderLocation} from "@box/widgets";
import links from "@box/shared/data/dummy_links"
import {ModalContext} from "@box/contexts";
import {useTypedSelector} from "@box/app/store/hooks";
import {declOfNum} from "@box/shared";

const HeaderNowrap = () => {
    const city = useTypedSelector(state=>state.city.city)
    const offices = useTypedSelector(state=>state.office.offices)
    const {showSideMenu} = useContext(ModalContext)
    const navigateToOrder = () => {
    }
    return (
        <div className={s.header_wrapper}>
            <ContainerComponent>
                <header className={s.header}>
                    <div className={s.header_leftside}>
                        <img className={s.header_leftside_logo} src={Logo} alt=""/>
                        {offices && <p className={s.header_leftside_text}>
                            {offices.length} {declOfNum(offices.length, ['медофис','медофиса','медофисов'])} в г. {city.name}
                            <br/>
                            <a href="#services">смотреть на карте</a>
                        </p>}

                    </div>
                    <div className={s.header_rightside}>
                        <HeaderLocation/>
                            <SocialButton link={"https://t.me/izilab_support"} className={s.header_rightside_social_button} type={"telegram"}/>
                            <SocialButton link={"https://api.whatsapp.com/send?phone=79370004081&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!"} className={s.header_rightside_social_button} type={"whatsapp"}/>

                        <div className={s.header_rightside_content_desktop}>
                            <p className={s.header_rightside_text}>
                                На связи в мессенджерах
                                <br/>
                                <strong>с 7:00 до 22:00</strong>
                            </p>
                            <a href="#order">
                                <Button className={s.header_rightside_button} onClick={navigateToOrder} color={"pink"}
                                        type={"landing"}>
                                    <span>Записаться онлайн</span>
                                </Button>
                            </a>

                        </div>
                        <div onClick={showSideMenu} className={s.header_rightside_burger}>
                            <img src={BurgerMenu} alt=""/>
                        </div>
                    </div>
                </header>
                <DesktopNavigation links={links}/>
            </ContainerComponent>
        </div>

    );
};

export const Header = React.memo(HeaderNowrap)