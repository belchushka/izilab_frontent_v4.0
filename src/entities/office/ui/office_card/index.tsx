import React from 'react';
import OfficeIcon from "@assets/icons/office";
import s from "./style.module.scss"
import {IOffice} from "@box/entities";

interface IOfficeCard {
    onClick: (id: number, latitude: number, longitude: number)=>void
    active: boolean
    office: IOffice
}

export const OfficeCard: React.FC<IOfficeCard> = ({onClick, active=true, office}) => {
    const clickHandler = ()=>{
        onClick(office.id, office.latitude, office.longitude)
    }
    return (
        <div onClick={clickHandler} className={`${s.body} ${active && s.body_active}`}>
            <div className={s.body_head}>
                <OfficeIcon fill={active ? "white" : "#0187FC" }/>
                <h5>{office.partner_name}</h5>
            </div>
            <p>{office.city.name}, {office.address}</p>
        </div>
    );
};
