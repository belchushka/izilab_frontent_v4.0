import React, {MouseEventHandler, ReactElement, ReactNode, useEffect, useRef, useState} from 'react';
import s from "./style.module.scss"
import Cross from "../../assets/icons/cross.svg";
import CityModalCross from "@assets/icons/city_modal_cross_lg.svg";

interface IModal {
    className?: string
    children: React.ReactNode,
    zIndex: number,
    hide: (args: any) => void,
    showCross?: boolean,
}

// eslint-disable-next-line react/display-name
export const Modal: React.FC<IModal> = ({
                                            className,
                                            children,
                                            zIndex,
                                            hide,
                                            showCross = true,
                                        }) => {
    const [reload, setReload] = useState(0)
    const bodyRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        const callback = () => {
            setReload(state => state + 1)
        }
        window.addEventListener("resize", callback)
        return () =>{
            window.removeEventListener("resize", callback)
        }
    }, [])

    const outerClickHandler: MouseEventHandler<HTMLDivElement> = (ev)=>{
        const target = ev.target as Node
        if (target && bodyRef.current) {
            if (!bodyRef.current.contains(target)) {
                hide("outer")
            }
        }
    }
    return (
        <div onClick={outerClickHandler} className={`${s.modal_wrapper}`} style={{
            zIndex,
            maxHeight: window.innerHeight + 'px',
            height: "100%"
        }}>
            <div ref={bodyRef} className={`${s.modal_body} ${className}`}>
                {showCross && <div onClick={hide} className={s.modal_body_cross}>
                    <img src={Cross} alt=""/>
                </div>}
                {children}
            </div>
        </div>
    );
}

interface IModalOptional extends Omit<IModal, 'showCross'> {
    headerChild: ReactNode | ReactElement
}

export const ModalOptional: React.FC<IModalOptional> = ({
                                                            className,
                                                            children,
                                                            zIndex,
                                                            hide,
                                                            headerChild
                                                        }) => {
    return <Modal zIndex={zIndex} hide={hide} className={`${className} ${s.modal_optional}`} showCross={false}>
        <div className={s.modal_optional_head}>
            <div className="">
                {headerChild}
            </div>
            <button onClick={hide}>
                <img src={CityModalCross} alt=""/>
            </button>
        </div>
        {children}
    </Modal>
}