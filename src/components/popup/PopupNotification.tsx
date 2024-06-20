import React from 'react';
import PopupCenter from './PopupCenter';

interface PopupRuleProps {
  onClose: () => void;
  title: string;
  leftContentButton: string,
  rightContentButton: string,
  rightHandlerButton: () => void;
}

const PopupRule: React.FC<PopupRuleProps> = ({ onClose, title, leftContentButton, rightContentButton, rightHandlerButton}) => {
  return (
    <PopupCenter
      onClick={onClose}
      classNameChild='noti'
    >
      <p className="content">{title}</p>
      <button className="button_left" onClick={onClose}>{leftContentButton}</button>
      <button className="button_right" onClick={rightHandlerButton}>{rightContentButton}</button>
    </PopupCenter>
  );
};

export default PopupRule;
