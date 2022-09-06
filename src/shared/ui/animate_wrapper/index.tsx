import React, {ReactNode} from 'react';
import {AnimatePresence} from "framer-motion";
import {motion} from "framer-motion";

interface IAnimateWrapper {
    children: ReactNode,
    className?: string
}

export const AnimateWrapper: React.FC<IAnimateWrapper> = ({children, className}) => {
    return (
        <AnimatePresence
            initial={true}
        >
            <motion.div
                initial={{
                    opacity:0
                }}
                animate={{
                    opacity:1
                }}
                exit={{
                    opacity:0
                }}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

