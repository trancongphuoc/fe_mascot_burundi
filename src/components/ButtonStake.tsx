import { ReactNode } from "react";
import { log } from "../utils/log";

interface ButtonStakeProps {
  children: ReactNode,
  handleClick: () => void,
  className: string,
}

const ButtonStake = ({children, handleClick, className} : ButtonStakeProps) => {
    log('<ButtonStake />')
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                handleClick()
            }}
            className={className}
        >
           {children}
        </button>
  )
}

export default ButtonStake;