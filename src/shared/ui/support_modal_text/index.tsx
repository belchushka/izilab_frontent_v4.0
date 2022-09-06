import React, {useContext} from 'react';
import {ModalContext} from "@box/contexts";
import s from "./style.module.scss"

const SupportModalTextNowrap = () => {
    const {showSupportModal} = useContext(ModalContext)
    return (
        <span className={s.text} onClick={showSupportModal}>Не могу найти нужные анализы</span>
    );
};

export const SupportModalText = React.memo(SupportModalTextNowrap)