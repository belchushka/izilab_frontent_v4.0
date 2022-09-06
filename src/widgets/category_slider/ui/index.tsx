import React, {useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';
import {CategorySliderPicker} from "@box/entities";
import s from "./style.module.scss";
import SliderArrow from "@assets/icons/slider_arrow.svg";
import {categories} from "@box/shared/data/dummy_categories";

const CategorySliderNowrap: React.FC = () => {
    const prevRef = useRef<HTMLDivElement>(null)
    const nextRef = useRef<HTMLDivElement>(null)
    const sliderRef = useRef<any>(null)
    const [isBeginning, setIsBeginning] = useState(true)
    const [isEnd, setIsEnd] = useState(false)
    return (
        <div className={s.slider_wrapper}>
            <Swiper
                slidesPerView={9}
                spaceBetween={20}
                slidesPerGroup={5}
                scrollbar={window.innerWidth<1199 ? {
                    hide:false,
                    enabled:false,
                } : false}
                onInit={(swiper)=>{
                    sliderRef.current = swiper
                }}
                onSlideChange={(swiper)=>{
                    setIsBeginning(swiper.isBeginning)
                    setIsEnd(swiper.isEnd)
                }}
                modules={[Scrollbar]}
                breakpoints={{
                    1199:{
                        slidesPerView: 9,
                        slidesPerGroup: 5,
                        scrollbar:{
                            enabled:false,
                            hide:true
                        }
                    },
                    959:{
                        scrollbar:{
                            enabled:true,
                            hide:false
                        },
                        slidesPerView: 8,
                        slidesPerGroup: 4,
                        spaceBetween:16,
                    },
                    639:{
                        scrollbar:{
                            enabled:true,
                            hide:false
                        },
                        slidesPerView: 5,
                        slidesPerGroup: 2,
                        spaceBetween:12,
                    },
                    480:{
                        scrollbar:{
                            enabled:true,
                            hide:false
                        },
                        slidesPerView: 4,
                        slidesPerGroup: 2,
                        spaceBetween:8,
                    },
                    320:{
                        scrollbar:{
                            enabled:true,
                            hide:false
                        },
                        slidesPerView: 3,
                        slidesPerGroup: 2,
                        spaceBetween:12,
                    }
                }}
                className={s.slider}
            >

                {categories?.map(el=>{
                    return <SwiperSlide key={el.id}>
                        <CategorySliderPicker {...el}/>
                    </SwiperSlide>
                })}

            </Swiper>
            <div onClick={()=>sliderRef.current.slideNext()} id={"#test1"} className={`${s.slider_arrow} ${s.next_arrow} ${isEnd && s.slider_arrow_disabled}`} ref={nextRef}>
                <img src={SliderArrow} alt=""/>
            </div>
            <div onClick={()=>sliderRef.current.slidePrev()} className={`${s.slider_arrow} ${s.prev_arrow} ${isBeginning && s.slider_arrow_disabled}`} ref={prevRef}>
                <img src={SliderArrow} alt=""/>
            </div>
        </div>

    );
};

export const CategorySlider = React.memo(CategorySliderNowrap)