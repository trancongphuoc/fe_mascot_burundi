import { motion } from 'framer-motion';
import { MouseEventHandler, ReactNode } from 'react';
import { createPortal } from 'react-dom';
// import { log } from '../../utils/log';

interface PopupCenterProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  classNameChild: string;
  className?: string;
}

export default function PopupCenter({
  children,
  onClick,
  classNameChild,
  className = 'popup-overlay-center',
}: PopupCenterProps) {
  // log('<PopCenterProps />')

  const modalRoot = document.getElementById('modal-root');
  
  if (!modalRoot) {
    console.error('Modal root element not found');
    return null; // Or handle it in a way that makes sense for your application
  }

  return createPortal(
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
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>,
    modalRoot
  );
}
