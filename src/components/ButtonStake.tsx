import { ReactNode } from "react";
// import { log } from "../utils/log";

import audioBet from '../../public/sounds/stake_audio.wav';

interface ButtonStakeProps {
  children: ReactNode;
  handleClick: () => void;
  className: string;
}

const confirmRef = new Audio(audioBet);

const ButtonStake = ({
  children,
  handleClick,
  className,
}: ButtonStakeProps) => {
  // log("<ButtonStake />"); 

  return (
    <button
      // onTouchEnd={(e) => {
      //   e.stopPropagation();
      //   e.preventDefault();
      //   confirmRef.play();
      //   handleClick();
      // }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        confirmRef.play();
        handleClick();
      }}
      className={className}
    >
      {children}
    </button>
  );
};

export default ButtonStake;
