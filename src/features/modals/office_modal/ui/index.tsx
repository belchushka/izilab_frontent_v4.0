import React, {useContext, useEffect, useState} from 'react';
import s from "./style.module.scss"
import {GeolocationControl, Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {ModalOptional, useCart} from "@box/shared";
import {ModalContext} from "@box/contexts";
import {OfficeCard, setCartDate, setCartOffice} from "@box/entities";
import AlertSign from "@assets/icons/alert_sign.svg"

interface IOfficeSelectMapModal {
    zIndex: number
}


const OfficeSelectModalNoWrap: React.FC<IOfficeSelectMapModal> = ({zIndex}) => {
    const {hideOfficeSelectModal} = useContext(ModalContext)
    const [mapState, setMapState] = useState({center: [55.78874, 49.12214], zoom: 12})
    const {disabledOffices} = useCart()
    const dispatch = useTypedDispatch()
    const city_offices = useTypedSelector(state => state.office.offices)
    const office_id = useTypedSelector(state => state.cart.office_id)
    const city = useTypedSelector(state => state.city.city)
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        window.setOffice = function (id) {
            dispatch(setCartOffice(id))
            dispatch(setCartDate(null))
            hideOfficeSelectModal()
        }
    }, [])
    const onCardClick = (id: number, latitude: number, longitude: number) => {
        dispatch(setCartOffice(id))
        dispatch(setCartDate(null))
        setMapState({
            center: [latitude, longitude],
            zoom: 18
        })
    }
    useEffect(() => {
        setMapState({
            center: [city.latitude || 55.78874, city.longitude || 49.12214],
            zoom: 12
        })
    }, [city])
    return (
        <ModalOptional headerChild={
            <div className={`${s.modal_body_container_header} ${s.body_header}`}>
                <h4>Выбор медицинского офиса</h4>
            </div>
        } zIndex={zIndex} className={s.body} hide={hideOfficeSelectModal}>
            <div className={s.body_content}>
                <div className={`${s.office_list} tiny_scroll`}>
                    {city_offices.map(el => {
                        return <OfficeCard active={office_id == el.id} office={el} onClick={onCardClick}/>
                    })}

                </div>
                <div className={s.map_wrapper}>
                    <YMaps>
                        <div>
                            <Map className={s.body_content_map} state={mapState}
                                 width={"100%"}
                                 options={{
                                     suppressMapOpenBlock: true
                                 }}
                            >
                                <ZoomControl/>
                                {city_offices?.map((el: any) => {
                                    const active: boolean = !disabledOffices.includes(el.id)
                                    // @ts-ignore
                                    const icon_layout = ymaps.templateLayoutFactory.createClass(
                                        `<div style="background: white; border-radius: 50%; width: 60px; height: 60px">
                                               <img width="60px" height="60px" style="${!active ? 'filter:brightness(90%)' : ''}" src="${el.partner_logo}"/>
                                        </div>`);
                                    return <Placemark key={el.id} geometry={[el.latitude, el.longitude]} properties={{
                                        balloonContentHeader: `
                                        <div class="custom_baloon_title_wrapp">
                                            ${!active ? `<img src="${AlertSign}"/>` : ""}
                                            <h3 class="custom_baloon_title ${!active ? "custom_baloon_title_error" : ""}">
                                                    ${active ? el.address : 'Часть анализов не выполняется в данном медицинском офисе'}
                                            </h3>
                                        </div>
                                        `,
                                        balloonContentFooter: active ? `<button onclick="window.setOffice(${el.id})" class="custom_baloon">Выбрать офис</button>` : '',
                                        balloonCloseButton: false
                                    }} options={{
                                        // iconLayout: "default#image",
                                        iconImageSize: [60, 60],
                                        iconShape: {
                                            type: 'Circle',
                                            coordinates: [0, 0],
                                            radius: 60
                                        },
                                        iconLayout: icon_layout,
                                        // iconImageHref: el.partner_logo,
                                        closeButton: false
                                    }}
                                                      modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                    />

                                })}

                            </Map>
                        </div>
                    </YMaps>
                </div>
            </div>
        </ModalOptional>
    );
};

export const OfficeSelectModal = React.memo(OfficeSelectModalNoWrap)