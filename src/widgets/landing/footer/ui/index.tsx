import React from 'react';
import {Map, Placemark, YMaps} from "react-yandex-maps";
import s from "./style.module.scss";
import {ContainerComponent} from "@box/shared";
import Telegram from "@assets/icons/tg_icon.svg"
import Whatsapp from "@assets/icons/ws_icon.svg"
import Inst from "@assets/icons/inst_icon.svg"
import Vk from "@assets/icons/vk_icon.svg"

const FooterNowrap = () => {
    return (
        <div className={s.container}>
            <ContainerComponent id={"contacts"} className={s.container_contacts_wrapper}>
                <div className={s.container_contacts_wrapper_form}>
                    <h6>Контакты</h6>
                    <p><a target={"_blank"} href="https://api.whatsapp.com/send?phone=79370004081&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!" style={{
                        textDecoration:"underline"
                    }}>8 (937) 000-40-81</a> - WhatsApp</p>
                    <p><a target={"_blank"} href={"tel:+78435580016"} style={{
                        textDecoration:"underline"
                    }}>8 (843) 558-00-16</a> - тех. поддержка</p>
                    <p><a target={"_blank"} href={"mailto:info@izilab.ru"} style={{
                        textDecoration:"underline"
                    }}>info@izilab.ru</a></p>
                    <p>Офис: г. Казань, ул. Петербургская, 52</p>
                    <p>
                        <a target={"_blank"} href="https://izilab.ru/static/medlicsanpin.pdf">Лицензия №ЛО-66-01-003681 <br/> от 06.11.2015</a>
                    </p>

                    <div className={s.container_contacts_wrapper_form_socials}>
                        <a target={"_blank"} href="https://vk.com/izilab"><img src={Vk} alt=""/></a>
                        <a target={"_blank"} href="https://instagram.com/izilab_rt/"><img src={Inst} alt=""/></a>
                        <a target={"_blank"} href="https://t.me/izilab_rt"><img src={Telegram} alt=""/></a>
                        <a target={"_blank"} href="https://api.whatsapp.com/send?phone=79370004081&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!"><img src={Whatsapp} alt=""/></a>
                    </div>
                </div>
            </ContainerComponent>
            <YMaps>
                <div>
                    <Map options={{
                        suppressMapOpenBlock: true
                    }} className={s.container_map} defaultState={{center: [55.78874 ,49.12214], zoom: 12 }}  width={"100%"} height={"100%"}>
                        <Placemark geometry={[55.78874 ,49.12214]}  properties = {{
                            balloonContent: 'г. Казань, ул. Даурская, 25 Сдача биоматериала: Пн-Пт - с 7:00 до 10:00 Сб - с 7:30 до 10:00 Вс - с 8:00 до 10:00'
                        }} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                        />
                    </Map>
                </div>
            </YMaps>
        </div>
    );
};

export const Footer = React.memo(FooterNowrap)
