import React from 'react';
import {BlockHeader} from "@box/shared/ui/block_header";
import Advantage1 from "@assets/images/advantage1.png"
import Advantage2 from "@assets/images/advantage2.png"
import Advantage3 from "@assets/images/advantage3.png"
import Advantage4 from "@assets/images/advantage4.png"
import {ContainerComponent} from "@box/shared/ui/container_component";
import s from "./style.module.scss"

const AdvantagesNowrap = () => {
    return (
        <ContainerComponent className={`block`}>
            <BlockHeader title={"Онлайн-лаборатория"} alignment={"center"} subtitle={<p>Почему сдавать анализы в онлайн-лаборатории IZILAB выгоднее?</p>}/>
            <div className={s.advantages}>
                <div className={s.advantage}>
                    <img src={Advantage1} alt=""/>
                    <div className="">
                        <h5>Оформление на сайте</h5>
                        <p>Оформление и оплата заказа происходит онлайн, поэтому вы
                            не тратите свое время в медофисе</p>
                    </div>

                </div>
                <div className={s.advantage}>
                    <img src={Advantage2} alt=""/>
                    <div className="">
                        <h5>Партнерские медофисы</h5>
                        <p>Вы можете выбрать любой медофис удобно расположенный
                            в вашем городе</p>
                    </div>

                </div>
                <div className={s.advantage}>
                    <img src={Advantage3} alt=""/>
                    <div className="">
                        <h5>Выгодные цены</h5>
                        <p>Оптимизация расходов и процессов позволяет предоставлять выгодные цены</p>
                    </div>

                </div>
                <div className={s.advantage}>
                    <img src={Advantage4} alt=""/>
                    <div className="">
                        <h5>Анализ в подарок</h5>
                        <p>Сдавая анализы на сумму
                            от 5000 рублей, вы получите анализ на выбор в подарок</p>
                    </div>

                </div>
            </div>
        </ContainerComponent>
    );
};

export const Advantages = React.memo(AdvantagesNowrap)