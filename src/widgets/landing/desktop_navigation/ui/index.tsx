import React from 'react';
import s from "./style.module.scss"
import {useTypedDispatch} from "@box/app/store/hooks";
import {setCategory} from "@box/entities";
import {ICategory} from "@box/shared";

interface Link {
    title:string,
    link:string,
    primary?:boolean,
    blank?: boolean,
    setCategory?: ICategory
}

interface IDesktopNavigation {
    links: Array<Link>
}

const DesktopNavigationNowrap: React.FC<IDesktopNavigation> = ({links}) => {
    const dispatch = useTypedDispatch()
    const onClick = (category: ICategory | undefined)=>{
        if (category){
            dispatch(setCategory(category))
        }
    }
    return (
        <div className={s.link_container}>
            {links?.map(el=>{
                return <a target={el.blank ? "_blank" : "_self"} onClick={()=>onClick(el.setCategory)} key={el.link} type={"anchor"} className={el.primary ? s.pink : ''} href={el.link}>{el.title}</a>
            })}
        </div>
    );
};

export const DesktopNavigation = React.memo(DesktopNavigationNowrap)
