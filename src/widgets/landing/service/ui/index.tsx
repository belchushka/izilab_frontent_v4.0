import React from 'react';
import {ContainerComponent, BlockHeader, declOfNum} from "@box/shared";
import s from "./style.module.scss"
import {OfficeMap} from "@box/entities";
import {useTypedSelector} from "@box/app/store/hooks";

interface IService {
    withHeader?: boolean
}

const ServiceNowrap: React.FC<IService> = ({withHeader = true}) => {
    const offices = useTypedSelector(state=>state.office.offices)
    const city = useTypedSelector(state=>state.city.city)
    return (
        <ContainerComponent id={"services"} className={`${s.service_wrapper} block`}>
            {withHeader && <BlockHeader title={"Услуги и цены"} subtitle={<p>Ниже вы можете ознакомиться с нашим прайс-листом
                на услуги и анализы</p>} alignment={"center"}/>}

            <div className={s.service_wrapper_content}>
                {withHeader &&  <a target={"_blank"} className={s.service_wrapper_content_link} href="https://izilab.ru/static/%D0%9F%D1%80%D0%B5%D0%B9%D1%81%D0%BA%D1%83%D1%80%D0%B0%D0%BD%D1%82_%D0%90%D0%BD%D0%B0%D0%BB%D0%B8%D0%B7%D0%BE%D0%B2_%D0%B8_%D0%A3%D1%81%D0%BB%D1%83%D0%B3062022.pdf">Прайс-лист анализов и услуг</a>
                }
                <div className={s.service_wrapper_content_info}>
                    <div className={s.service_wrapper_content_info_block}>
                        <h5>{offices.length} {declOfNum(offices.length, ['медофис','медофиса','медофисов'])} {city.id && `в г. ${city.name}`}</h5>
                        <p>Как сделать заказ?</p>
                        <p>
                            1. Нажмите на кнопку «Записаться онлайн» и с помощью удобного поиска и фильтра по категориям добавьте необходимые анализы в свою корзину
                            <br/>
                            <br/>
                            2. После формирования корзины осуществите переход в корзину нажав кнопку «Перейти в корзину». В корзине выберите ваш город, партнерский медофис и дату сдачи анализов. Затем нажмите на кнопку «Перейти к оформлению»
                            <br/>
                            <br/>
                            3. На следующем этапе введите ваши данные и оплатите заказ нажав на кнопку "Оплатить". После успешной оплаты заказа вам поступит электронное направление на вашу почту
                            <br/>
                            <br/>
                            4. Посетите выбранный вами партнерский медофис в указанную дату и покажите администратору электронное направление (с телефона) и подтверждающие вашу личность документы
                            <br/>
                            <br/>
                            5. Получить результаты анализов на вашу электронную почту
                        </p>
                    </div>
                    <div className={s.service_wrapper_content_info_block}>
                        <OfficeMap/>
                    </div>
                </div>
            </div>
        </ContainerComponent>
    );
};

export const Service = React.memo(ServiceNowrap)
