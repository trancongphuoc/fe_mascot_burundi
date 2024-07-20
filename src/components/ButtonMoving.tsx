// MovingText.tsx
import { useState } from "react";
import { motion } from "framer-motion";

interface TextItem {
  id: number;
}

interface ButtonMovingProps {
  content: string;
  setClick: () => void;
  cssClass: string;
}

const ButtonMoving = ({ content, setClick, cssClass }: ButtonMovingProps) => {
  const [texts, setTexts] = useState<TextItem[]>([]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setTexts([...texts, { id: Date.now() }]);
    setClick();
  };

  const handleAnimationComplete = (id: number) => {
    try {
      setTexts(texts.filter((text) => text.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className={`${cssClass} button-moving`}
      onTouchStart={(e) => handleClick(e)}
    >
      {texts.map((text) => (
        <motion.p
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          key={text.id}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -100 }}
          transition={{ duration: 1 }}
          onAnimationComplete={() => handleAnimationComplete(text.id)}
          style={{ position: "absolute" }}
          className="button-moving--content"
        >
          {content}
        </motion.p>
      ))}
      {content}
    </button>
  );
};

export default ButtonMoving;
