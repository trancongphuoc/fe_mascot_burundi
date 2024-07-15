// MovingText.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';

interface TextItem {
  id: number;
}

interface ButtonMovingProps {
    content: string,
    setClick: () => void,
    cssClass: string,
}

const ButtonMoving = ({content, setClick, cssClass} : ButtonMovingProps) => {
  const [texts, setTexts] = useState<TextItem[]>([]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    setTexts([...texts, { id: Date.now() }]);
    setClick();
  };

  const handleAnimationComplete = (id: number) => {
    setTexts(texts.filter(text => text.id !== id));
  };

  return (
    <button className={`${cssClass} button-moving`} onClick={(e) => handleClick(e)}>
      {texts.map((text) => (
          <motion.p 
              onClick={(e) => e.stopPropagation()}
              key={text.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -100 }}
              transition={{ duration: 1 }}
              onAnimationComplete={() => handleAnimationComplete(text.id)}
              style={{ position: 'absolute' }}
              className='button-moving--content'>{content}
          </motion.p>
      ))}{content}
    </button>
  );
};

export default ButtonMoving;
