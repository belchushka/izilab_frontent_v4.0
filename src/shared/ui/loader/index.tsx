import React from 'react';
import s from "./style.module.scss"

const LoaderNowrap = () => {
    return (
        <div className={s.wrapper}>
            <span className={s.loader}></span>
        </div>
    );
};

export const Loader = React.memo(LoaderNowrap);