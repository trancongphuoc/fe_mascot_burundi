interface CardProps {
    card: string;
    className: string;
    classNameBackground: string;
}

function Card({ card, className, classNameBackground }: CardProps) {
    return (
        <div className={classNameBackground}>
            <img src={card} alt="card_background" className={className}></img>
        </div>
    );
}

export default Card;