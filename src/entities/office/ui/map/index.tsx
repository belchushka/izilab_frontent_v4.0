import React, {useEffect} from 'react';
import {GeolocationControl, Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import s from "@box/widgets/landing/service/ui/style.module.scss";
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";

interface IOfficeMap {
    enableSelect?: boolean,
}

const OfficeMapNowrap: React.FC<IOfficeMap> = ({enableSelect=false}) => {
    const offices = useTypedSelector(state=>state.office.offices)
    const city = useTypedSelector(state=>state.city.city)

    useEffect(() => {
        if (typeof window!=="undefined"){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            window.setOffice = function (point) {
                // onSelect(point)
            }
        }
        return ()=>{
            if (typeof window!=="undefined"){
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                window.setOffice = undefined
            }
        }
    }, [])
    return (
        <YMaps>
            <div>
                <Map className={s.service_wrapper_content_info_block_map}
                     state={{center: [city.latitude || 55.78874, city.longitude || 49.12214], zoom: 12}} width={"100%"} height={"100%"}
                    modules={["geolocation", "geocode"]}
                     options={{
                         suppressMapOpenBlock: true
                     }}
                >
                    <ZoomControl/>
                    {offices?.map((el: any) => {
                        {/*@ts-ignore*/}
                        return <Placemark key={el.id} geometry={[el.latitude, el.longitude]} properties={{
                            balloonContent: `${el.address}`
                        }} options={{
                            iconLayout: "default#image",
                            iconImageSize: [60, 60],
                            iconShape: {
                                type: 'Circle',
                                coordinates: [0, 0],
                                radius: 60
                            },
                            iconImageHref: el.partner_logo,
                        }}
                                          modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                        />
                    })}
                </Map>
            </div>
        </YMaps>
    );
};

export const OfficeMap = React.memo(OfficeMapNowrap)