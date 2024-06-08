import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { rules } from '../model/RuleContent';

interface PopupRuleProps {
  onClose: () => void;
}

const PopupRule: React.FC<PopupRuleProps> = ({ onClose }) => {
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);

  useEffect(() => {
    rules.forEach((rule) => {
      new Image().src = rule.image;
    });
  }, []);


  const handleNext = () => {
    setCurrentRuleIndex((prevIndex) => (prevIndex + 1) % rules.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="rule-popup-overlay">
      <motion.div 
        initial={{ opacity: 0, scale: .5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: .5 }}
        className="rule"
        onClick={e => e.stopPropagation()}>
        <p className='rule--primary mt-20px'>Thể lệ Đoán Linh Vật</p>
        <img 
          className='rule--img mb-20px mt-18-5px'
          src={rules[currentRuleIndex].image}
        />
        <p className='rule--secondary'>{rules[currentRuleIndex].text}</p>
        <div className='rule__line mt-18px'>
          {rules.map((_, index) => (
            <p 
              key={index}
              className={currentRuleIndex == index ? 'rule__line--selected' : 'rule__line--normal'}
            >&nbsp;</p>
            ))
          }
        </div>
        <motion.div
          whileTap={{y: 1}}
          className="rule__button mb-21px mt-13px"
          onClick={handleNext}>
          <p className="rule__button--next">Tiếp tục</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PopupRule;
