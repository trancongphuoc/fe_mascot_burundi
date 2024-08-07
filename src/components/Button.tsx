import { ReactNode } from "react"
// import { log } from "../utils/log"

interface ButtonProps {
    children: ReactNode,
    cssClass: string,
    onSet: () => void
}

const Button = function Button ({children, cssClass, onSet} : ButtonProps) {
    // log('<Button />');

    return <button className={cssClass} onClick={onSet}>
        {children}
    </button>
}

export default Button;