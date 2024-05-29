import React, { useState } from 'react';
import Rule1 from '../assets/rule_1.png';
import Rule2 from '../assets/rule_2.png';
import Rule3 from '../assets/rule_3.png';
import Rule4 from '../assets/rule_4.png';
import { motion } from 'framer-motion';

interface PopupRuleProps {
  onClose: () => void;
}

const PopupRule: React.FC<PopupRuleProps> = ({ onClose }) => {
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);

  const rules = [
    {
      image: Rule1,
      text: 'Trong lúc thời gian đếm ngược bạn nhấn chọn lá bài muốn đoán'
    },
    {
      image: Rule2,
      text: 'Bạn nhấn chọn lá bài sẽ hiện các mức cược, mỗi ván lật tối đa 4 lá bài'
    },
    {
      image: Rule3,
      text: 'Kết thúc đếm ngược sẽ tự động lật bài. Nếu trúng bạn nhận thưởng tương ứng với số tiền cược'
    },
    {
      image: Rule4,
      text: 'Chúng tôi sẽ hiện thị người thắng 1 ngày trước'
    }
  ];

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
