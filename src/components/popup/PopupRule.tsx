import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RULE_CONTENTS } from '../../model/RuleContent';
import PopupCenter from './PopupCenter';

interface PopupRuleProps {
  onClose: () => void;
}

const PopupRule = ({ onClose }: PopupRuleProps) => {
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);

  useEffect(() => {
    RULE_CONTENTS.forEach((rule) => {
      new Image().src = rule.image;
    });
  }, []);


  const handleNext = () => {
    setCurrentRuleIndex((prevIndex) => (prevIndex + 1) % RULE_CONTENTS.length);
  };

  return (
    <PopupCenter
     className='popup-overlay-history'
      onClick={onClose}
      classNameChild='rule'
    >
        <p className='rule--primary mt-20px'>Thể lệ Đoán Linh Vật</p>
        <img 
          className='rule--img mb-20px mt-18-5px'
          src={RULE_CONTENTS[currentRuleIndex].image}
        />
        <p className='rule--secondary'>{RULE_CONTENTS[currentRuleIndex].text}</p>
        <div className='rule__line mt-18px'>
          {RULE_CONTENTS.map((_, index) => (
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
     </PopupCenter>
  );
};

export default PopupRule;
