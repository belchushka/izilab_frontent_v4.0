import React, {ReactElement, ReactNode} from 'react';
import Alert from "@assets/icons/alert_sign.svg"
import s from "./style.module.scss"

interface IWarning {
    children: ReactNode | ReactElement
}

const WarningNoWrap: React.FC<IWarning> = ({children}) => {
    return (
        <div className={s.warning}>
            <img src={Alert} alt=""/>
            {children}
        </div>
    );
};

export const Warning = React.memo(WarningNoWrap)