import React from 'react';
import PopupCenter from './PopupCenter';

interface PopupRuleProps {
  onClose: () => void;
  title: string;
  leftContentButton: string,
  rightContentButton: string,
}

const PopupRule: React.FC<PopupRuleProps> = ({ onClose, title, leftContentButton, rightContentButton}) => {
  return (
    <PopupCenter
      onClick={onClose}
      className='noti'
    >
      <p className="content">{title}</p>
      <button className="button_left" onClick={onClose}>{leftContentButton}</button>
      <button className="button_right">{rightContentButton}</button>
    </PopupCenter>
  );
};

export default PopupRule;
