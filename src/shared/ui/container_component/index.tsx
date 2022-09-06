import React from 'react';
import s from "./style.module.scss"

interface IContainer {
    children?:React.ReactNode,
    className?:string,
    id?:string,
    type?: 'landing' | 'order'
}

export const ContainerComponent:React.FC<IContainer> =  ({children, className, id, type="landing"}) => {
    return (
        <div id={id} className={`${s.container} ${className} ${type!='landing' && s.container_expanded}`}>
            {children}
        </div>
    );
};




