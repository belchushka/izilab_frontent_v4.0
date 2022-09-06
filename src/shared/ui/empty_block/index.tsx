import React, {MouseEventHandler, useState} from 'react';
import s from "./style.module.scss"
import {Button} from "@box/shared";
import {SupportModalText} from "@box/shared/ui/support_modal_text";

interface IEmptyBlock {
    img: string,
    onButtonClick: (()=>void) |  MouseEventHandler<HTMLButtonElement> ,
    subtitle?: string,
    title?: string
}

const EmptyBlockNowrap: React.FC<IEmptyBlock> = ({img, onButtonClick, subtitle, title}) => {
    const [showSupport, setShowSupport] = useState(false)
    return (
        <>
            <div className={s.body}>
                <h4>{title ? title : "Ничего не найдено"}</h4>
                {subtitle && <p>{subtitle}</p>}
                <img src={img} alt=""/>
                <Button onClick={onButtonClick} type={"order"}>
                    <p>Вернуться в каталог</p>
                </Button>
                <SupportModalText/>
            </div>
        </>

    );
};

export const EmptyBlock = React.memo(EmptyBlockNowrap)