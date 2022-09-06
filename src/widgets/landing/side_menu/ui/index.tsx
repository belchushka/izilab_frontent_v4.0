import React, {MouseEventHandler, useContext, useRef} from 'react';
import s from "./style.module.scss"
import {IDummyLink} from "@box/shared/data/dummy_links";
import {ModalContext} from "@box/contexts";
import {motion} from "framer-motion";

interface ISideMenu {
    links: Array<IDummyLink>,
    show: boolean
}

const SideMenuNowrap: React.FC<ISideMenu> = ({links, show}) => {

    const {hideSideMenu} = useContext(ModalContext)
    const menuRef = useRef<HTMLDivElement>(null)

    const handleClose: MouseEventHandler<HTMLDivElement> = (event) => {
        if (menuRef !== null) {
            //@ts-ignore
            if (!menuRef.current?.contains(event.target)) {
                hideSideMenu()
            }
        }
    }
    return (
            <motion.div
                onClick={handleClose}
                style={{
                height: window.innerHeight + "px"
                }}
                className={`${s.menu_wrapper} ${show && s.menu_wrapper_visible}`}
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1
                }}
                exit={{
                    opacity: 0,
                }}

            >
                <motion.div
                    initial={{
                        right: "-100vw",
                    }}
                    animate={{
                        right: "0"
                    }}
                    exit={{
                        right:"-100vw"
                    }}
                    ref={menuRef} className={s.menu_wrapper_menu}
                >
                    <div className={s.menu_wrapper_menu_links}>
                        <div onClick={() => hideSideMenu()} className={s.menu_wrapper_menu_cross}>
                            <span></span>
                            <span></span>
                        </div>
                        {links?.map((el: any) => {
                            return <a target={el.blank ? "_blank" : "_self"}  key={el.link} onClick={() => hideSideMenu()} type={"anchor"}
                                      className={el.primary ? s.pink : ''} href={el.link}>{el.title}</a>
                        })}
                    </div>
                    <div className={s.menu_wrapper_menu_buttons}>
                        <a href="#order" onClick={() => hideSideMenu()} type={"anchor"}>
                            <button>Записаться онлайн</button>

                        </a>
                    </div>

                </motion.div>
            </motion.div>
    );
};

export const SideMenu = React.memo(SideMenuNowrap)
