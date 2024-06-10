import React from 'react';
import PopupCenter from './PopupCenter';

interface PopupRuleProps {
  onClose: () => void;
  title: string;
  leftContentButton: string,
  rightContentButton: string,
}

const PopupRule: React.FC<PopupRuleProps> = ({ onClose, title, leftContentButton, rightContentButton}) => {

  // const title = 'Không đủ iCoin để chơi, bạn có muốn nạp thêm?';
  // const leftContentButton = 'Huỷ';
  // const rightContentButton = 'Nạp thêm';

  return (
    <PopupCenter
      onClick={onClose}
    >
      <p className="content">{title}</p>
      <button className="button_left" onClick={onClose}>{leftContentButton}</button>
      <button className="button_right">{rightContentButton}</button>
    </PopupCenter>
  );
};

export default PopupRule;
