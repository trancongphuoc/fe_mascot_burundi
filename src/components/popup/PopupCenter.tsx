import { motion } from 'framer-motion';
import { MouseEventHandler, ReactNode } from 'react';

interface PopupCenterProps {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLDivElement>;
    classNameChild: string,
    classname: string,
}

export default function PopupCenter({children, onClick, classNameChild: classNameChild, classname: className = "popup-overlay-center"} : PopupCenterProps) {
    return (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClick}
            className={className}
            >
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className={classNameChild}
                    onClick={e => e.stopPropagation()}
                > {children}</motion.div>
            </motion.div>
    );
}