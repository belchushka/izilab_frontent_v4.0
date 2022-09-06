import React from 'react';
import s from "./style.module.scss"

interface IBlockHeader {
    title: string,
    subtitle?: React.ReactNode,
    alignment: "center" | "left",
    className?:string
}

const BlockHeaderNowrap : React.FC<IBlockHeader>= ({title, subtitle, alignment="center", className}) => {
    return (
        <div className={`${alignment == "center" && s.center} ${s.container}`}>
            <h4 className={`${s.title} ${className}`}>{title}</h4>
            {subtitle}
        </div>
    );
};

export const BlockHeader = React.memo(BlockHeaderNowrap)
