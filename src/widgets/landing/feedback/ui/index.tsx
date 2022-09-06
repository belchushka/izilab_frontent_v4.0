import React, {useRef} from 'react';
import s from './style.module.scss'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';
import {Navigation, Pagination} from "swiper";
import Sliderarrow from "@assets/icons/slider_arrow.svg"
import {BlockHeader, FeedbackComment} from "@box/shared";

const FeedbackNowrap = () => {
    const prevRef = useRef<HTMLDivElement>(null)
    const nextRef = useRef<HTMLDivElement>(null)
    return (
        <div id={"comments"} className={`block ${s.container}`}>
            <BlockHeader title={"Отзывы"} alignment={"center"}/>
            <div className={s.container_slider}>
                <Swiper
                    autoHeight={true}
                    spaceBetween={20}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        nextEl:nextRef.current,
                        prevEl:prevRef.current,
                        enabled:true

                    }}

                    onInit={(swiper)=>{
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current
                        swiper.navigation.init()
                        swiper.navigation.update()
                    }}
                    modules={[Navigation, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <FeedbackComment text={"В IZILAB всегда есть классные акции и скидки! И супер-удобно, что к вам выезжает медсестра на дом, для забора анализов, но если вы не добираете сумму анализов для бесплатного выезда медсестры - всеми акциями можно воспользоваться в партнерских медофисах - они раскиданы по всему городу."} name={"Гульназ"} name_subtitle={<p className={s.slide_subtitle}>Блог в <a
                           target={"_blank"} href="https://www.instagram.com/p/CbHY4eQIvbV/?utm_medium=copy_link">Instagram</a> (75.1 тыс. подписчиков)</p>}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <FeedbackComment text={"Пошла сегодня и протестила сама.\n" +
                            "Осталась очень довольна."} name={"Алиса"} name_subtitle={<p className={s.slide_subtitle}>Блог в <a
                            target={"_blank"} href="https://www.instagram.com/p/CbHUAr4gSG3/?utm_medium=copy_link">Instagram</a> (47.5 тыс. подписчиков)</p>}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <FeedbackComment text={"Эта услуга будет актуальна, тем кто не хочет добирать стоимость заказа до определенной суммы, чтобы приехала медсестра бесплатно, а медофисы удобно расположены по всему городу.\n"} name={"Алсу"} name_subtitle={<p className={s.slide_subtitle}>Блог в <a
                            target={"_blank"} href="https://www.instagram.com/p/CbHTyYjACC_/?utm_medium=copy_link">Instagram</a>  (151 тыс. подписчиков)</p>}
                        />
                    </SwiperSlide>


                    <div className={`${s.slider_arrow} ${s.next_arrow}`} ref={nextRef}>
                        <img src={Sliderarrow} alt=""/>
                    </div>
                    <div className={`${s.slider_arrow} ${s.prev_arrow}`} ref={prevRef}>
                        <img src={Sliderarrow} alt=""/>
                    </div>
                </Swiper>

            </div>
        </div>
    );
};

export const Feedback = React.memo(FeedbackNowrap)
