import React, {ReactNode} from 'react';
import {AnimatePresence} from "framer-motion";
import {motion} from "framer-motion";

interface IAnimateWrapper {
    children: ReactNode,
    condition: boolean,
    zIndex?: number
}

export const ComponentAnimateWrapper: React.FC<IAnimateWrapper> = ({children, condition, zIndex=0}) => {
    return (
        <AnimatePresence
            initial={true}
            exitBeforeEnter={true}
        >
            {condition && <motion.div
                style={{
                    zIndex: zIndex,
                    ...(zIndex!==0 && {
                        position: "fixed",
                        top:0,
                        left:0
                    })
                }}
                initial={{
                    opacity: 0,
                    height:0
                }}
                animate={{
                    opacity: 1,
                    height: "auto"
                }}
                exit={{
                    opacity: 0,
                    height:0
                }}
                transition={{
                    duration:.15,
                }}
            >
                {children}
            </motion.div>}

        </AnimatePresence>
    );
};
