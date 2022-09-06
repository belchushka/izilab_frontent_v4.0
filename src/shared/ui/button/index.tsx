import React, {MouseEventHandler} from 'react';
import s from "./style.module.scss"

interface ICustomButton {
    onClick:(()=>void) | MouseEventHandler<HTMLButtonElement> | undefined,
        disabled?: boolean,
        children:React.ReactNode,
        color?: "pink" | "blue",
        className?:string,
        type: "landing" | "order" | "cart",
        animated?: boolean,
        width?: number | string
}

const ButtonNowrap: React.FC<ICustomButton> = ({onClick,children, color, className, type, disabled=false, animated = false, width="auto"}) => {
    return (
        <button
            style={{
                width: typeof width == "string" ? width : width+"px"
            }}
            onClick={disabled ? ()=>null : onClick} className={`${s.button}  ${type=="landing" && s.button_landing} ${(type=="landing" || type=="cart") ? (color=="pink")  ? s.button_pink : s.button_blue : ""} ${type=="cart" && s.button_cart} ${type=="order" && s.button_order} ${className} ${disabled && s.button_disabled}`}>
            {children}
        </button>

    );
};

export const Button = React.memo(ButtonNowrap)
