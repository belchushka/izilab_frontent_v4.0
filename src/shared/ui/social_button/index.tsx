import React from 'react';
import Telegram from "@assets/icons/telegram.png"
import Whatsapp from "@assets/icons/whatsapp.png"
import s from "./style.module.scss"

interface ISocialButton {
    type: "telegram" | "whatsapp",
    link: string,
    className?: string
}

const SocialButtonNowrap: React.FC<ISocialButton> = ({type, link, className}) => {
    return (
        <a href={link} target={"_blank"} className={`${className} ${s.button_wrapper}`}>
            {type == "telegram" && <img src={Telegram} alt=""/>}
            {type == "whatsapp" && <img src={Whatsapp} alt=""/>}
        </a>
    );
};

export const SocialButton = React.memo(SocialButtonNowrap)
