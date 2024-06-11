import { ScaleLoader } from "react-spinners";

interface LoadingProps {
    className?: string,
}

export default function Loading({className = 'mine-popup__loading'} : LoadingProps) {
    return (       
            <div className={className}>
                <ScaleLoader color='#F15350' />
            </div>);
}