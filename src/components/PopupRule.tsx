import React, { useState } from 'react';
import Rule1 from '../assets/rule-1.png';
import Rule2 from '../assets/rule-2.png';
import Rule3 from '../assets/rule-3.png';
import Rule4 from '../assets/rule-4.png';

interface PopupRuleProps {
  show: boolean;
  onClose: () => void;
}

const PopupRule: React.FC<PopupRuleProps> = ({ show, onClose }) => {
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

  if (!show) {
    return null;
  }

  return (
    <div onClick={onClose} className="rule-popup-overlay">
      <div className="rule" onClick={e => e.stopPropagation()}>
        <p className='rule--primary mt-18-5px'>Thể lệ Đoán Linh Vật</p>
        <img 
          className='rule--img mb-20px mt-18-5px'
          src={rules[currentRuleIndex].image}
          alt={`Rule ${currentRuleIndex + 1}`}
        />
        <p className='rule--secondary'>{rules[currentRuleIndex].text}</p>
        <div className='rule__line mt-16px'>
          {rules.map((_, index) => (
            <p 
              key={index}
              className={currentRuleIndex == index ? 'rule__line--selected' : 'rule__line--normal'}
            >&nbsp;</p>
            ))
          }
        </div>
        <div className="rule__button mb-20px mt-13px" onClick={handleNext}>
          <p className="rule__button--next">Tiếp tục</p>
        </div>
      </div>
    </div>
  );
};

export default PopupRule;
