import React from 'react';
import s from "./style.module.scss"

interface ISamplingCard {
    price: number,
    title: string
}

export const SamplingCard: React.FC<ISamplingCard> = ({title,price}) => {
    return (
        <div className={s.card}>
            <p>{title}</p>
            <p>{price} ₽</p>
        </div>
    );
};
